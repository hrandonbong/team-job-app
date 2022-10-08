const deleteJobApplication = async () => {
    const deleteApplicationId = document.getElementById("delete-modal").getAttribute("itemid");
    // emit request to delete row and reload
    const payload = {
        'id': deleteApplicationId
    }
    console.log(payload);
    const response = await fetch('/job', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // TODO create a proper loading and confirmation or rejection UI
    if (response.status === 200) {
        setTimeout(function(){
            window.location.reload();
            }, 10);
    }
    hideDeleteModal();
};

const showDeleteModal = (event) => {
    const screenCover = document.getElementById('delete-modal-screen-cover');
    const modal = document.getElementById('delete-modal');

    modal.style.display = 'flex';
    screenCover.style.display = 'block';

    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
    const deleteButton = document.getElementsByClassName("delete-job-application");
    let itemId = event.target?.parentNode?.getAttribute("itemprop");
    if (itemId === undefined) {
        itemId = event.target?.getAttribute("itemprop");
    }
    modal.setAttribute("itemId", itemId);
    deleteButton.onclick = deleteJobApplication;
}


const showCreateModal = () => {
    const screenCover = document.getElementById('create-modal-screen-cover');
    const modal = document.getElementById('create-modal');

    modal.style.display = 'flex';
    screenCover.style.display = 'block';

    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
}


const hideDeleteModal = () => {
    const screenCover = document.getElementById('delete-modal-screen-cover');
    const modal = document.getElementsByClassName('delete-modal-container')[0];
    modal.id = 'delete-modal';
    modal.style.opacity = '0';
    screenCover.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        screenCover.style.display = 'none';
    }, 400);
}

const showEditModal = (event) => {
    let skill = document.getElementById("edit-job-application");
    const screenCover = document.getElementById('edit-modal-screen-cover');
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'flex';
    screenCover.style.display = 'block';
    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
    const button = document.getElementById("submit-edit-job-application");
    let itemId = event.target?.parentNode?.getAttribute("itemprop");
    if (itemId === null) {
        itemId = event.target?.getAttribute("itemprop");
    }
    modal.setAttribute("itemId", itemId);
    button.onclick = editApplicationSubmit;
}

const hideEditModal = () => {
    const screenCover = document.getElementById('edit-modal-screen-cover');
    const modal = document.getElementById('edit-modal');

    modal.style.opacity = '0';
    screenCover.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        screenCover.style.display = 'none';
    }, 400);
};

const formHandler = (event) => {
    event.preventDefault()
    const form = event.target.parentNode;
    return {
        'id': form.id,
        'name': form.children[0]?.children[0]?.value,
    };
}

const editApplicationSubmit = async () => {
    const editApplicationId = document.getElementById("edit-modal").getAttribute("itemid");
    const skills =  document.getElementById("skills-list-edit").value;
    const cleaned_skills = skills.split(',').map(element => element.trim())
    const payload = {
        'id': editApplicationId,
        'title': document.getElementById("job-title-edit").value,
        'date applied': document.getElementById("date-applied-edit").value,
        'company': document.getElementById("company-edit").value,
        'skills': cleaned_skills,
    }
    console.log(payload);

    const response = await fetch('/job', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    //console.log(await response.json())
    if (response.status === 200) {
        hideEditModal();
        setTimeout(function(){
            window.location.reload();
            }, 10);
    }

    // TODO create a proper loading and confirmation or rejection UI
}

const createJobApplicationSubmit = async () => {
    const skills =  document.getElementById("skills-list").value;
    const cleaned_skills = skills.split(',').map(element => element.trim())
    const payload = {
        'title': document.getElementById("job-title").value,
        'date applied': document.getElementById("date-applied").value,
        'company': document.getElementById("company").value,
        'skills': cleaned_skills,
    }

    const response = await fetch('/job', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.status === 200) {
        
        setTimeout(function(){
            window.location.reload();
            }, 10);
    }
    console.log(await response.json())
    hideCreateModal();
}

const hideCreateModal = () => {
    const screenCover = document.getElementById('create-modal-screen-cover');
    const modal = document.getElementById('create-modal');

    modal.style.opacity = '0';
    screenCover.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        screenCover.style.display = 'none';
    }, 400);
};


const generateEditEventListeners = () => {
    const deleteButtons = document.getElementsByClassName("delete-button");
    const editButtons = document.getElementsByClassName("job-application-edit-button");
    for(let i in deleteButtons) {
        console.log(i);
        if (i === 'length') continue;
        deleteButtons[i].onclick = showDeleteModal;
    }
    for(let i in editButtons) {
        console.log(i);
        if (i === 'length') continue;
        editButtons[i].onclick = showEditModal;
    }
    document.getElementById('delete-job-application').onclick = deleteJobApplication;
    document.getElementById('submit-edit-job-application').onclick = editApplicationSubmit;
}

generateEditEventListeners();