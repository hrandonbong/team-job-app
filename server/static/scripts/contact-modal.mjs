const centerModal = () => {
    try{
        const modal = document.getElementById('edit-modal');
        const modalTop = (window.innerHeight - modal.getBoundingClientRect().height) / 2;
        const modalLeft = (window.innerWidth - modal.getBoundingClientRect().width) / 2;
        modal.style.top = `${modalTop}px`;
        modal.style.left = `${modalLeft}px`;
    } catch (error) {
        console.log(error);
    }
    try {
        const modal = document.getElementById('create-modal');
        const modalTop = (window.innerHeight - modal.getBoundingClientRect().height) / 2;
        const modalLeft = (window.innerWidth - modal.getBoundingClientRect().width) / 2;
        modal.style.top = `${modalTop}px`;
        modal.style.left = `${modalLeft}px`;
    } catch (error) {
        console.log(error);
    }
    try {
        const modal = document.getElementById('delete-modal');
        const modalTop = (window.innerHeight - modal.getBoundingClientRect().height) / 2;
        const modalLeft = (window.innerWidth - modal.getBoundingClientRect().width) / 2;
        modal.style.top = `${modalTop}px`;
        modal.style.left = `${modalLeft}px`;
    } catch (error) {
        console.log(error);
    }
};

const editContact = (event) => {
    const payload = generatePayload(event)
    showEditModal(payload);
};

const deleteContact = async (event) => {
    const deleteContact = document.getElementById(event.target?.parentNode?.parentNode?.id);
    const payload = {
        'id': event.target?.parentNode?.parentNode?.id,
        'name': deleteContact.children[0]?.innerText,
        'company': deleteContact.children[1]?.innerText,
        'phone': deleteContact.children[2]?.innerText,
        'email': deleteContact.children[3]?.innerText
    }
    // emit request to delete row and reload
    const response = await fetch('/contact', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // TODO create a proper loading and confirmation or rejection UI
    if (response.status === 200) {
        hideDeleteModal();
        setTimeout(function(){
            window.location.reload();
            }, 10);
    }
};

const generatePayload = (event) => {
    let dataArr;
    if (event.target.nodeName === 'BUTTON') {
        dataArr = event.target.parentNode.children[0].children;
    } else {
        dataArr = event.target.parentNode.parentNode.children[0].children;
    }
    return {
        'id' : dataArr[0]?.parentNode.id,
        'name': dataArr[0]?.children[0]?.innerText,
        'company': dataArr[1]?.children[0]?.innerText,
        'phone': dataArr[2]?.children[0]?.innerText,
        'email': dataArr[3]?.children[0]?.innerText,
    };
}

const showEditModal = (payload) => {
    const screenCover = document.getElementById('edit-modal-screen-cover');
    const modal = document.getElementById('edit-modal');

    modal.style.display = 'flex';
    screenCover.style.display = 'block';
    centerModal()

    if (payload) {
        const modalInputs = modal.children[2]?.children;
        modal.children[2].id = payload.id;
        modalInputs[0].children[0].value = payload.name || null;
        modalInputs[1].children[0].value = payload.company || null;
        modalInputs[2].children[0].value = payload.phone || null;
        modalInputs[3].children[0].value = payload.email || null;
    }

    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
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

const showCreateModal = (payload) => {
    const screenCover = document.getElementById('create-modal-screen-cover');
    const modal = document.getElementById('create-modal');

    modal.style.display = 'flex';
    screenCover.style.display = 'block';
    centerModal()

    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
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

const showDeleteModal = (event) => {
    const screenCover = document.getElementById('delete-modal-screen-cover');
    const modal = document.getElementById('delete-modal');

    modal.style.display = 'flex';
    screenCover.style.display = 'block';
    centerModal()

    let contactId;
    if (event.target.nodeName === 'BUTTON') {
        contactId = event.target?.parentNode?.children[0];
    } else {
        contactId = event.target?.parentNode?.parentNode?.children[0];
    }
    modal.id = contactId.id;

    document.getElementById('delete-contact-name').innerText = contactId.children[0]?.innerText;

    modal.style.opacity = '1';
    screenCover.style.opacity = '1';
}

const hideDeleteModal = () => {
    const screenCover = document.getElementById('delete-modal-screen-cover');
    const modal = document.getElementsByClassName('delete-modal-container')[0];
    modal.id = 'delete-modal';
    console.log(modal);
    modal.style.opacity = '0';
    screenCover.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        screenCover.style.display = 'none';
    }, 400);
}

const formHandler = (event) => {
    event.preventDefault()
    const form = event.target.parentNode;
    return {
        'id': form.id,
        'name': form.children[0]?.children[0]?.value,
        'company': form.children[1]?.children[0]?.value,
        'phone': form.children[2]?.children[0]?.value,
        'email': form.children[3]?.children[0]?.value
    };
}

const editContactSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation()
    const payload = formHandler(event)
    const response = await fetch('/contact', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // TODO create a proper loading and confirmation or rejection UI
    if (response.status === 200) {
        window.location.reload();
    }
}

const createContactSubmit = async (event) => {
    event.preventDefault();
    const payload = formHandler(event)
    const response = await fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.status === 200) {
        hideCreateModal();
        setTimeout(function(){
            window.location.reload();
            }, 10);
    }
    console.log(await response.json())
    // TODO create a proper loading and confirmation or rejection UI
}

const generateEditEventListeners = () => {
    const editButtons = document.getElementsByClassName("edit-button");
    const deleteButtons = document.getElementsByClassName("delete-button");
    for(let i in editButtons) {
        if (i === 'length') continue;
        editButtons[i].onclick = editContact;
    }
    for(let i in deleteButtons) {
        if (i === 'length') continue;
        deleteButtons[i].onclick = showDeleteModal;
    }
    document.getElementById('submit-edit-contact').onclick = editContactSubmit;
    document.getElementById('submit-create-contact').onclick = createContactSubmit;
    document.getElementById('delete-contact').onclick = deleteContact;
}

generateEditEventListeners();
