# Welcome to Team JoBBB's Job Tracker Application
Central Repo for Team JoBBB's Capstone Project
- Project can be [Found Here](https://jobstracker-u34edb44ka-wl.a.run.app)
- Link to [Figma Design File](https://www.figma.com/file/UI6ZwQkNNNvJL0oBP01of3/Jobs-Tracker-Design?node-id=0%3A1)


## Branches
- Main Branch
  - This branch is the production branch that we will use for deployment to the gcloud server. Thus, it is paramount that this branch is free from error and inconsistencies. 
  - Of course, errors and inconsistencies are part of the development process. However, while a feature or page is in development, we will work in the staging branch, and finished features and pages will be merged and deployed when ready.
  - Any quick patches or hot-fixes that are necessary will be branched and merged here.

- Staging Branch
  - This branch is where most of our development will happen. Of course, we will still branch and pull-request into this branch to maintain code consistency and versioning.
  - The basic workflow should look like:
    - Branch off staging with a branch name correlated to the feature e.g. "edit-job-app-crash"
    - Do the development, run any tests, and check linting
    - Create a PR for the branch and continue to work until code review has been approved


## Making Commits and Merges
Instructions for branching, committing, and merging in our continuous integration workflow.
  - Follow the procedure outlined above for either the main or staging branch.
  - Open a pull-request and follow the template
  - Once pull-request is opened, linting and testing will be checked. 
  - If all checks pass, request a review from a teammate.
  - Once the review has been approved, branch will be merged.

## Hosting info
  - This project is hosted on Google Cloud using the Cloud Run API. Continuous Integration is set up through the main branch
  - The main branch is protected from merges by testing and review requirements.
  - A merge into main automatically triggers a docker build and deployment to Google Cloud as long as tests and linting pass. Follow the process as shown:
    - Click on the merge status icon: ![view_merge](https://user-images.githubusercontent.com/71521153/177206603-13700abb-d7fb-45ed-9fb5-61078ef70b00.png)
    - Click on the Google Cloud Build Job ![merge_checks](https://user-images.githubusercontent.com/71521153/177206641-b72ba460-ebdc-4439-b68d-53f210b7f57f.png)
    - Info will be populated here when build is complete. However, you can monitor and debug the build on Google Cloud by clicking the link as long as you have been granted permission to the project. ![build_console](https://user-images.githubusercontent.com/71521153/177206711-9699442e-f7b2-43e6-8b96-e38928061a67.png)



## File Structure
This project is a fairly small one, and as such, it does not have a very specific file structure. However, let's try to keep our files consistent anyhow.
- root
  - This is the project root folder where we will keep config, .env, and any other files that apply app-wide.
  - ![root_dir](https://user-images.githubusercontent.com/71521153/176966933-2408cfbe-5502-49f9-8dc2-55a42d832544.png)

- ./server
  - The server folder will house the application file and any other modules required for the server such as database, routing, and controller files.
  - ![server](https://user-images.githubusercontent.com/71521153/176967280-65214016-e5f0-4a0c-9a19-28b767f3b2fa.png)

  - ./static
    - The static folder will house all static files like stylesheets and scripts. As you can see, I have already created style and script folders. The placement and naming of the static folder is significant, and Flask will specifically come here to look for static assets when requested by the template files.
    - ![static](https://user-images.githubusercontent.com/71521153/176967292-3f8c9092-5184-48b7-991b-bb7764101b5b.png)

- ./templates
  - The templates folder houses all of the Flask/Jinja templates, and it serves as the root folder when Flask looks for template files that are often served in routes via ```render_template('template.html')```
  - Files can be in either .html or .tmpl form, and I have provided examples of both. As you can see, the index.html file contains the header.tmpl files a sub-template.
  - ![templates](https://user-images.githubusercontent.com/71521153/176967553-a7d0a391-866f-4055-b3e6-721165494232.png)

- ./tests
  - As the name says, this is the folder where we will keep the test files that are run on automated or manual testing. Currently I have two test files. One for any client tests and one for any server tests. Theses file names and locations cannot be changed without changing the git actions flow, but we can certainly set up sub-directories and modules to bring into these testing files as needed.
  - ![tests](https://user-images.githubusercontent.com/71521153/176967735-f9595e5f-b4f0-469e-8b87-72df4f515318.png)

  

## File Templating Info
  Specifications on data formats, style rules, and other design standards.
  - Refer to [Figma Design File](https://www.figma.com/file/UI6ZwQkNNNvJL0oBP01of3/Jobs-Tracker-Design?node-id=0%3A1)


## Installing and Building Project Locally
  - To install and run this project for local use: 
      - [] clone the repo using the shell of your choid with: ```git clone https://github.com/taylojo5/team-jobbb-app.git```
      - [] start the server locally: ```python ./server/jobs_tracker_server.py``` 
