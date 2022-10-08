window.onload = () => {
    if(window.location.href.includes("profile")){
        const profile = document.getElementById("nav-profile");
        profile.classList.add("nav-link-active");
        for(let child in profile.children){
            if (child === "length") break;
            profile.children[child].style.color = '#0C1140';
        }
    }
    else if(window.location.href.includes("job-applications")){
        const applications = document.getElementById("nav-job-applications");
        applications.classList.add("nav-link-active");
        for(let child in applications.children){
            if (child === "length") break;
            applications.children[child].style.color = '#0C1140';
        }
    }
    else{
        const contacts = document.getElementById("nav-contacts");
        contacts.classList.add("nav-link-active");
        for(let child in contacts.children){
            if (child === "length") break;
            contacts.children[child].style.color = '#0C1140';
        }
    }
    console.log("Active applied");
}
