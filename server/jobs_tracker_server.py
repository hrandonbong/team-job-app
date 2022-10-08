# Version: 0.0.1
# Project: Jobs Tracker Capstone Project
# File: Main app server file

import os
from google.cloud import datastore
# import google.oauth2.credentials
# import google_auth_oauthlib.flow
from google.oauth2 import id_token
from google.auth.transport import requests

from flask import Flask, render_template, redirect, session, request,\
    url_for, jsonify

# init app instance
app = Flask(__name__, template_folder='../templates')
app.secret_key = "SECRET-KEY"
# init db instance
client = datastore.Client()

SCOPES = ['https://www.googleapis.com/auth/userinfo.profile']
CLIENT_SECRETS_FILE = "../secrets/client_secret_482563455816" \
                      "-683337raafm7ojfrnmnrcmiscpqc1dc5.apps" \
                      ".googleusercontent.com.json"
client_id = "482563455816-683337raafm7ojfrnmnrcmiscpqc1dc5.apps" \
            ".googleusercontent.com"


@app.route('/', methods=['GET'])
def login():
    # TODO serve welcome html page with any support files needed
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@app.route('/auth', methods=['GET', 'POST'])
def auth():
    jwt = request.form["credential"]
    id_info = id_token.verify_oauth2_token(jwt, requests.Request(),
                                           client_id)
    query = client.query(kind='users')
    query.add_filter('sub', '=', id_info['sub'])
    user_list = list(query.fetch())
    if not user_list:
        new_user = datastore.entity.Entity(key=client.key('users'))
        new_user.update({'sub': id_info['sub'],
                         'g_name': id_info['given_name'],
                         'f_name': id_info['family_name'],
                         'skills': []})
        client.put((new_user))
        # new_user.update({'id': new_user.id})
        uid = new_user.id
    else:
        uid = user_list[0].id
    session['credential'] = jwt
    session['user'] = id_info
    session['uid'] = uid
    print(uid)
    return redirect('/profile')


@app.route('/delete_everything', methods=['DELETE'])
def delete_everything():
    users = client.query(kind='users')
    user_query = list(users.fetch())
    for i in user_query:
        client.delete(i)


@app.route('/users', methods=['GET'])
def get_users():
    # TODO serve profile html page with any support files needed
    query = client.query(kind='users')
    users = list(query.fetch())
    return jsonify(users)


@app.route('/profile', methods=['GET'])
def profile():
    # TODO serve profile html page with any support files needed
    if 'credential' not in session:
        return redirect('/')
    user_info = session.get('user')
    user_key = client.key('users', session.get('uid'))
    user = client.get(key=user_key)

    skill_query = client.query(kind='skills')
    skill_query.add_filter('user', '=', user_info['sub'])
    skill_data = list(skill_query.fetch())
    return render_template('profile-page.html', user=user_info,
                           data=skill_data)


@app.route('/job-applications', methods=['GET'])
def job_applications():
    # TODO serve profile html page with any support files needed
    query = client.query(kind='jobs')
    query.add_filter('user', '=', session.get('uid'))
    jobs_list = list(query.fetch())
    # return jsonify(jobs_list)
    return render_template('job-application-page.html', data=jobs_list)


@app.route('/job/<jid>', methods=['GET'])
def get_job(jid):
    # TODO serve profile html page with any support files needed
    job_key = client.key('jobs', int(jid))
    job = client.get(key=job_key)
    return jsonify(job)
    # return render_template('job-application-page.html')


@app.route('/job', methods=['POST', 'PATCH', 'DELETE'])
def update_jobs():
    content = request.get_json()
    if 'credential' not in session:
        return redirect('/')
    if request.method == 'POST':
        if ('title' and 'company' and 'skills') not in content:
            return {'Error': 'Some fields were not filled out'}, 400
        new_job = datastore.entity.Entity(key=client.key('jobs'))
        new_job.update({'title': content['title'],
                        'company': content['company'],
                        'date applied': content['date applied'],
                        'skills': content['skills'],
                        'user': session.get('uid')})
        client.put(new_job)
        url_self = request.base_url + '/' + str(new_job.key.id)
        new_job.update({"id": new_job.key.id,
                        "self": url_self})
        client.put(new_job)
        return jsonify(new_job), 200
    elif request.method == 'DELETE':
        job_key = client.key('jobs', int(content['id']))
        client.delete(job_key)
        return '', 200
    elif request.method == 'PATCH':
        job_key = client.key('jobs', int(content['id']))
        jobs = client.get(key=job_key)
        for i in content:
            jobs.update({i: content[i]})
        client.put(jobs)
        return '', 200


@app.route('/contacts', methods=['GET'])
def contacts():
    # TODO serve profile html page with any support files needed
    # test_data = [
    #     {
    #         'id': '123',
    #         'name': 'Jeff Bezos',
    #         'company': 'Amazon',
    #         'phone': '344-435-4456',
    #         'email': 'jeff.bezos@amazon.com'
    #     },
    #     {
    #         'id': '234',
    #         'name': 'Bill Gates',
    #         'company': 'Microsoft',
    #         'phone': '493-567-4837',
    #         'email':
    #         'bill.gates@microsoft.com'
    #     },
    #     {
    #         'id': '345',
    #         'name': 'Steven Jobs',
    #         'company': 'Apple',
    #         'phone': '584-583-6857',
    #         'email': 'steve.jobs@apple.com'
    #     },
    #     {
    #         'id': '456',
    #         'name': 'Elon Musk',
    #         'company': 'SpaceX',
    #         'phone': '483-495-3958',
    #         'email': 'elon.musk@spacex.com'
    #     }
    # ]

    query = client.query(kind='contacts')
    query.add_filter('user', '=', session.get('uid'))
    contact_list = list(query.fetch())
    return render_template('contact-page.html', data=contact_list)


@app.route('/contact', methods=['POST', 'PATCH', 'DELETE'])
def update_contact():
    # TODO handle request based on method and return correct data and status
    """example payload for all methods:
    req.json = {
        'id': '123',
        'name': 'Jeff Bezos',
        'company': 'Amazon',
        'phone': '344-435-4456',
        'email': 'jeff.bezos@amazon.com'
    }
    """
    content = request.get_json()
    if 'credential' not in session:
        return redirect('/')
    if request.method == 'POST':
        if ('name' and 'company' and 'phone' and 'email') not in content:
            return {'Error': 'Some fields were not filled out'}, 400
        new_contact = datastore.entity.Entity(key=client.key('contacts'))
        new_contact.update({'name': content['name'],
                            'company': content['company'],
                            'phone': content['phone'],
                            'email': content['email'],
                            'user': session.get('uid')})
        client.put(new_contact)
        url_self = request.base_url + '/' + str(new_contact.key.id)
        new_contact.update({"id": new_contact.key.id,
                            "self": url_self})
        client.put(new_contact)
        return '', 200
    elif request.method == 'DELETE':
        contact_key = client.key('contacts', int(content['id']))
        client.delete(contact_key)
        return '', 200
    elif request.method == 'PATCH':
        contact_key = client.key('contacts', int(content['id']))
        contact = client.get(key=contact_key)
        for i in content:
            contact.update({i: content[i]})
        client.put(contact)
        return '', 200
    return request.json, 200


@app.route('/skills', methods=['GET'])
def skills():
    # TODO serve profile html page with any support files needed
    query = client.query(kind='skills')
    skill_list = list(query.fetch())
    return jsonify(skill_list)
    # return render_template('skills.html')


@app.route('/skill', methods=['POST', 'PATCH', 'DELETE'])
def update_skill():
    content = request.get_json()
    print('content:', content)
    if request.method == 'POST':
        sub = session.get('user')['sub']
        if not content:
            return {'Error': 'Some fields were not filled out'}, 400
        new_skill = datastore.entity.Entity(key=client.key('skills'))
        new_skill.update({'name': content['name'],
                          'user': sub})
        client.put(new_skill)
        url_self = request.base_url + '/' + str(new_skill.key.id)
        new_skill.update({"id": new_skill.key.id,
                          "self": url_self})
        client.put(new_skill)
        return jsonify(new_skill), 200
    elif request.method == 'DELETE':
        skill_key = client.key('skills', int(content['id']))
        client.delete(skill_key)
        return '', 200
    elif request.method == 'PATCH':
        skill_key = client.key('skills', int(content['id']))
        skills = client.get(key=skill_key)
        for i in content:
            skills.update({i: content[i]})
        client.put(skills)
        return '', 200


# @app.route('/user/<uid>/skills/<sid>', methods=['PUT', 'DELETE'])
# def add_skills_user(uid, sid):
#     user_key = client.key('users', int(uid))
#     skill_key = client.key('skills', int(sid))
#     user = client.get(key=user_key)
#     skill = client.get(key=skill_key)
#     if request.method == 'PUT':
#         user['skills'].append(skill.id)
#     if request.method == 'DELETE':
#         del user['skills'][sid]
#     return '', 200


@app.route('/jobs/<jid>/skills/<sid>', methods=['PUT', 'DELETE'])
def add_skills_job(jid, sid):
    job_key = client.key('jobs', int(jid))
    skill_key = client.key('skills', int(sid))
    job = client.get(key=job_key)
    skill = client.get(key=skill_key)
    if request.method == 'PUT':
        job['skills'].append(skill.id)
    if request.method == 'DELETE':
        del job['skills'][sid]
    return '', 200


@app.route('/error')
def error():
    return render_template('error.html', error="Standard Error Template")


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
