const copyText = async (event) =>{
    console.log('Copying');
    const originalText = event.target.innerText;
    await navigator.clipboard.writeText(originalText);
    event.target.id = "widget-data-copied";
    event.target.innerText = "Copied";
    setTimeout(()=>{
        event.target.id = "";
        event.target.innerText = originalText;
    }, 500);
}

const generateDataEventListeners = () => {
    const dataSpans = document.getElementsByClassName("data-span");
    for (let i in dataSpans) {
        if (i === 'length') continue;
        dataSpans[i].onclick =  copyText;
    }
}

generateDataEventListeners();