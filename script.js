createKeyboard();

function createKeyboard() {
    createDisplay();
    buttonsLettersLayout();
}

function createDisplay() {
    let display = document.createElement("textarea");
    display.id = "display";
    display.value = "";
    display.autofocus = true;
    display.onblur = function () {this.focus()}
    display.rows = 5;


    //style
    display.style.backgroundColor = "rgb(200,200,200)"
    display.style.fontFamily = "Georgia, serif";
    display.style.fontSize = "20px"
    display.style.width = "668px";
    display.style.resize = "none";
    display.style.display = "block";
    display.style.margin = "auto";
    document.body.append(display);
}
function buttonsLettersLayout() {
    let buttonNames = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'backspace'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'return'],
        ['shift1', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '@', '.', 'shift2'],
        ['.?123', 'smile', 'mic', ' ', '_', '-', 'hide']
    ];

    createButtons(buttonNames);
}

function buttonsNumbersLayout() {
    let buttonNames = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
        ['`', '|', '{', '}', '%', '^', '*', '/', '"', 'return'],
        ['#+=', 'undo', '$', '&', '~', '#', '=', '+', '.', '#+='],
        ['ABC', 'smile', 'mic', ' ', '_', '-', 'hide']
    ];

    createButtons(buttonNames);
}

function createButtons(buttonNames) {
    let buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.style.backgroundColor = "rgb(220,220,220)"
    buttons.style.border = "1px solid black";
    buttons.style.margin = "auto";
    buttons.style.width = "662px"
    buttons.style.padding = "5px"
    for(let i = 0; i < 4; i++){
        let buttonRaw = document.createElement("div");
        if (i === 1) {
            buttonRaw.style.marginLeft = "25px";
        }
        buttonNames[i].forEach(
            element => buttonRaw.append(createButton(element))
        );
        buttons.append(buttonRaw);
    }

    document.body.append(buttons);
}

function createButton (name) {
    let button = document.createElement("button");
    button.id = name;
    button.className = "buttons";
    button.innerHTML = name;
    button.onclick = function () { keyPressed(name) };

    //style
    button.style.backgroundColor = "rgb(80,80,80)";
    button.style.fontFamily = "Georgia, serif";
    button.style.fontSize = "15px"
    button.style.color = "white";
    button.style.verticalAlign = "top";
    button.style.width = "50px";
    button.style.height = "50px";
    button.style.margin = "3px 5px 3px 5px";
    button.style.borderLeft = "0px";
    button.style.borderTop = "0px";
    button.style.borderRight = "0px";
    button.style.borderRadius = "3px"
    button.style.cursor = "pointer";


    // special buttons style
    let icon = document.createElement("i");
    switch (name) {
        case " ":
            button.style.width = "290px";
            break;
        case "return":
            button.style.width = "85px";
            button.style.backgroundColor = "rgb(160,160,160)";
            break;
        case "undo":
            button.style.width = "110px";
            break;
        case "backspace":
            button.style.backgroundColor = "rgb(160,160,160)";
            icon.className = "material-symbols-outlined";
            icon.innerHTML = "backspace";
            button.innerHTML = "";
            button.append(icon);
            break;
        case "shift1":
        case "shift2":
            icon.className = "material-symbols-outlined";
            icon.innerHTML = "keyboard_arrow_up";
            icon.id = "shiftIcon";
            button.innerHTML = "";
            button.append(icon);
            break;
        case "smile":
            button.style.backgroundColor = "rgb(160,160,160)";
            icon.className = "material-symbols-outlined";
            icon.innerHTML = "sentiment_satisfied";
            button.innerHTML = "";
            button.append(icon);
            break;
        case "mic":
            button.style.backgroundColor = "rgb(160,160,160)";
            icon.className = "material-symbols-outlined";
            icon.innerHTML = "mic";
            button.innerHTML = "";
            button.append(icon);
            break;
        case "hide":
            button.style.backgroundColor = "rgb(160,160,160)";
            icon.className = "material-symbols-outlined";
            icon.innerHTML = "keyboard_hide";
            button.innerHTML = "";
            button.append(icon);
            break;
        case "ABC":
        case "#+=":
        case ".?123":
            button.style.backgroundColor = "rgb(160,160,160)";
            break;
    }

    return button;
}

function keyPressed(buttonName) {
    if(buttonName.length === 1) {
        insertChar(buttonName);
    }
    else switch (buttonName) {
        case "backspace":
            deleteLastElement();
            break;
        case "shift1":
        case "shift2":
            shift();
            break;
        case ".?123":
            changeLayoutToNum();
            break;
        case "ABC":
            changeLayoutToLetters();
            break;
        case "mic":
            micInput();
            break;
        case "smile":
            smile();
            break;
        default:
            break;
    }

}

function insertChar(id) {
    document.getElementById("display").value +=
        document.getElementById(id).innerHTML;
    if(document.getElementById("shiftIcon").innerHTML === "keyboard_double_arrow_up") {
        unshiftButtons();
    }
}

function deleteLastElement() {
    document.getElementById("display").value =
        document.getElementById("display").value.slice(0, -1);
}

function shift() {
    if (document.getElementById("shiftIcon").innerHTML === "keyboard_arrow_up") {
        shiftButtons();
    }
    else if (document.getElementById("shiftIcon").innerHTML === "keyboard_double_arrow_up") {
        capsLock();
    }
    else {
        unshiftButtons();
    }

}

function shiftButtons() {
    document.getElementById("shiftIcon").innerHTML = "keyboard_double_arrow_up";

    //change icon
    //let
    //document.getElementById("shift1").innerHTML.replace()
    let elements = document.getElementsByClassName("buttons");
    for(let i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML.length === 1) {
            let asciiCode = elements[i].innerHTML.charCodeAt(0);
            if (asciiCode >= 97 && asciiCode <= 122) {
                elements[i].innerHTML = String.fromCharCode(asciiCode - 32);
            }
        }
    }
}

function capsLock() {
    document.getElementById("shiftIcon").innerHTML = "keyboard_capslock";
}

function unshiftButtons() {
    document.getElementById("shiftIcon").innerHTML = "keyboard_arrow_up";

    let elements = document.getElementsByClassName("buttons");
    for(let i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML.length === 1) {
            let asciiCode = elements[i].innerHTML.charCodeAt(0);
            if (asciiCode >= 65 && asciiCode <= 90) {
                elements[i].innerHTML = String.fromCharCode(asciiCode + 32);
            }
        }
    }
}

function changeLayoutToNum() {
    removeButtons();
    buttonsNumbersLayout();
}

function changeLayoutToLetters() {
    removeButtons();
    buttonsLettersLayout();
}

function micInput() {
    alert("Microphone not supported :(");
}

function smile() {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}

function removeButtons() {
    document.getElementById("buttons").remove();
}