function typeChanged(element) {

    // get elements 
    let selected = element.value;
    let questionDiv = document.getElementById("questionDiv");
    let optionDiv = document.getElementById("optionDiv");
    let activeCheckbox = document.getElementById("activeCheckbox");


    // display configuration
    if (selected === "Multiple Choice") {
        activeCheckbox.style.display = "block";
        questionDiv.style.display = "block";
        optionDiv.style.display = "block";
    } else {
        activeCheckbox.style.display = "block";
        questionDiv.style.display = "block";
        optionDiv.style.display = "none";
    }
}

(function () {
    let options = document.getElementById("options");
    let addOptionBtn = document.getElementById("addOption");
    let removeOptionBtn = document.getElementById("removeOption");

    // add option
    addOptionBtn.onclick = function () {
        let newOption = document.createElement("input");
        newOption.setAttribute("type", "text");
        newOption.setAttribute("name", "options");
        newOption.setAttribute("class", "survey mt-2");
        newOption.setAttribute("placeholder", "Enter Option");
        options.appendChild(newOption);
    }

    // remove option
    removeOptionBtn.onclick = function () {
        let inputChildren = options.getElementsByTagName('input');
        if (inputChildren.length >= 2) {
            options.removeChild(inputChildren[inputChildren.length - 1]);
        }
    }
})();

