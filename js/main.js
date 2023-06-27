// TODO: show warning on page refresh
// window.onbeforeunload = () => {
//   return "Changes you made may not be saved.";
// };

const form = document.getElementById('entity-form');
// const btn = document.getElementById('submit');
// console.log(btn);

var buttonNumber = 0;
var entityDict = [];

let createButton = (parsedJsonData) => {

    buttonNumber++; // to add button name dynamically for new buttons like button-1, button-2, and so on...
    var entityButtons = document.getElementById("entity-buttons");

    var btn = document.createElement("BUTTON");
    btn.className = "button-" + String(buttonNumber);
    btn.innerHTML = parsedJsonData;
    btn.id = String(buttonNumber);

    var closeButton = document.createElement("BUTTON");
    closeButton.className = "button-" + String(buttonNumber);
    closeButton.innerHTML = '<span onclick=removeClass()>x</span>';
    closeButton.id = String(buttonNumber);

    entityButtons.appendChild(btn);
    entityButtons.appendChild(closeButton);

    console.log("Button created successfully");
};

function removeClass() {
    var buttons = document.getElementsByTagName("button");
    var buttonsCount = buttons.length;

    for (var i = 0; i <= buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            const btnId = this.id;
            console.log('button id: ', btnId);

            document.getElementById(btnId).remove(); // removes the button consisting entity and other keys
            document.getElementById(btnId).remove(); // removes the 'x' button associated with the previously deleted button

            /* doesn't work
               classNameNew.parentNode.removeChild(classNameNew);
               return false;
            */
        };
    }
}

const newBtn = document.getElementById('entity-buttons');

newBtn.onclick = function(){
    var txtarea = document.getElementById("textarea-left");

    var len = txtarea.value.length;

    var start = txtarea.selectionStart; // Obtain the first index of the selected character
    var finish = txtarea.selectionEnd;  // Obtain the last index of the selected character

    var selectedTextToString = String(newBtn.innerText);
    var cleanedText = selectedTextToString.match(/{([^}]+)}/g); // get the content only within the curly braces of the text
    console.log('cleanedText: ', cleanedText)

    var cleanedTextParsed = JSON.parse(cleanedText);

    // Obtain the selected text
    var selectedText = txtarea.value.substring(start, finish);
    const spacePattern = /\s{2,}/g;
    var emptySpacesSelected = spacePattern.test(selectedText);
    if (emptySpacesSelected == true){
        const text = "Selected text is empty or too many whitespaces!";
        console.warn(text);
        alert(text);
        return 0;
    }
    console.log('selectedText: ', selectedText)
    if (cleanedTextParsed.value == undefined){
        cleanedTextParsed.value = selectedText
    }
    var replacedText = selectedText + JSON.stringify(cleanedTextParsed);
    console.log('replacedText: ', replacedText)

    txtarea.value =  txtarea.value.substring(0,start) + replacedText  + txtarea.value.substring(finish,len);

}

function getSelection(){
    var txtarea = document.getElementById("textarea-left");

    var len = txtarea.value.length;

    // Obtain the index of the first selected character
    var start = txtarea.selectionStart;

    // Obtain the index of the last selected character
    var finish = txtarea.selectionEnd;

    // Obtain the selected text
    var sel = txtarea.value.substring(start, finish);
    var replace = "---" + sel + "---";
    txtarea.value =  txtarea.value.substring(0,start) + replace + txtarea.value.substring(finish,len);
    return sel
}

function createText(parsedJsonDataNew) {
    // entityDict.push(parsedJsonDataNew);
    var existingText = document.getElementById("textarea-up"); 
    // existingText.innerHTML = "new text";
    existingText.value = existingText.value + "," + parsedJsonDataNew;

    console.log("existingText: ", existingText.value);
    console.log("combined: ", existingText.value + parsedJsonDataNew);
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the form from submitting

    const formData = new FormData(form); // get the form data 
    // const formValues = [...formData.entries()];
    // console.log('formValues: ', formValues);

    const data = Object.fromEntries(formData);
    console.log('data: ', data);

    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    var parsedJsonData = JSON.parse(jsonData);
    if(parsedJsonData["entity"] == "" && parsedJsonData["value"] == "" && parsedJsonData["group"] == "" && parsedJsonData["role"] == ""){
        console.warn("Empty form submission");
        return 0;
    }
    if (parsedJsonData.value == ""){
        delete parsedJsonData.value;
    }
    if (parsedJsonData.group == ""){
        delete parsedJsonData.group;
    }
    if (parsedJsonData.role == ""){
        delete parsedJsonData.role;
    }
    const parsedJsonDataNew = JSON.stringify(parsedJsonData);
    // document.getElementById('textarea-up').value = parsedJsonDataNew;
    console.log("parsedJsonDataNew: ", parsedJsonDataNew)
    // createButton(parsedJsonDataNew);
    
    createText(parsedJsonDataNew);
});
