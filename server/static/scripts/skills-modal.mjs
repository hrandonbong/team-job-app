const deleteSkill = async (event) => {
    const deleteSkillId = event.target?.parentNode?.parentNode?.getAttribute('itemid')
    const deleteSkillName = event.target?.parentNode?.parentNode?.getAttribute('name')
    const payload = {
        'id': deleteSkillId,
        'name': deleteSkillName,
    }
    console.log(payload);
    // emit request to delete row and reload
    const response = await fetch('/skill', {
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
};

const showCreateModal = () => {
    const screenCover = document.getElementById('create-modal-screen-cover');
    const modal = document.getElementById('create-modal');

    modal.style.display = 'flex';
    screenCover.style.display = 'block';

    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
}


const showEditModal = (event) => {
    const screenCover = document.getElementById('edit-modal-screen-cover');
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'flex';
    screenCover.style.display = 'block';
    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
    const button = document.getElementById("submit-edit-skill");
    const skill = document.getElementById("edit-skill")
    var editSkillSubmitWithParams = editSkillSubmit.bind(this, event);
    button.onclick = editSkillSubmitWithParams;
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

const editSkillSubmit = async (event) => {
    const editSkillId = event.target?.parentNode?.parentNode?.getAttribute('itemid')
    skill = {
        'id': editSkillId,
        'name': document.getElementById("Edited Skill").value
    }
    console.log(skill);
    const response = await fetch('/skill', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(skill)
    })
    console.log(response.status);
    if (response.status === 200) {
        window.location.reload();
    }
    // TODO create a proper loading and confirmation or rejection UI
}

const createSkillSubmit = async () => {
    const skill = document.getElementById("Skill").value;
    const payload = {'name': skill}
    
    const response = await fetch('/skill', {
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
    // TODO create a proper loading and confirmation or rejection UI
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
    const deleteButtons = document.getElementsByClassName("delete-skill");
    const editButtons = document.getElementsByClassName("edit-skill");
    for(let i in deleteButtons) {
        if (i === 'length') continue;
        deleteButtons[i].onclick = deleteSkill;
    }
    for(let i in editButtons) {
        if (i === 'length') continue;
        editButtons[i].onclick = showEditModal;
    }
}

generateEditEventListeners();
