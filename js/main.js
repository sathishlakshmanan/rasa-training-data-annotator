// TODO: show warning on page refresh
// window.onbeforeunload = () => {
//   return "Changes you made may not be saved.";
// };

const textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', (e) => {
  if (e.keyCode === 9) {
    e.preventDefault();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selection = value.substring(start, end);

    if (selection.includes('\n')) {
      // if multiple lines are selected, indent each line
      const lines = selection.split('\n');
      const indentedLines = lines.map((line) => `\t${line}`);
      const indentedText = indentedLines.join('\n');

      textarea.setRangeText(indentedText, start, end, 'end');
    } else {
      // if no selection or single line is selected, insert a tab character
      textarea.setRangeText('\t', start, end, 'end');
    }
  } else if (e.keyCode === 13) {
    // check if the previous line is indented and replicate the indentation
    const lines = textarea.value.substring(0, textarea.selectionStart).split('\n');
    const previousLine = lines[lines.length - 1];
    const indentationMatch = previousLine.match(/^(\t- +)/);

    if (indentationMatch && indentationMatch[1]) {
      e.preventDefault();
      const indentation = indentationMatch[1];

      textarea.setRangeText('\n' + indentation, textarea.selectionStart, textarea.selectionEnd, 'end');
    }
  }
});

const form = document.getElementById('entity-form');
const textareaRight = document.getElementById("textarea-right"); 
textareaRight.value = "";
//
// for development
const example = document.getElementById("textarea-left"); 
example.value = "i am from chennai.\n\nthis is bangalore. where is your place?\n\nchennai is in Tamilnadu"

// const btn = document.getElementById('submit');
// console.log(btn);

var buttonNumber = 0;
var entityDict = [];

const createBtn = document.getElementById('create-buttons');
createBtn.onclick = function(){
    if (textareaRight.value == ""){
        alert("No buttons to create");
        console.warn("No buttons to create");
        return 0;
    }
    var entityButtons = document.getElementById("entity-buttons");
    // const entityBtnNew = document.getElementById('entity-buttons');
    entityButtons.innerHTML = "";
    const existingText = document.getElementById("textarea-right").value; 

    const pattern = /(\{[^{}]+\})/g;
    var listOfEntityDicts = existingText.split(pattern);
    const setOfEntityDicts = new Set(listOfEntityDicts);

    for (dictValue of setOfEntityDicts) {
        // remove unwanted strings like `, or ""` after split with regex pattern (5 is an arbitrary number)
        if (dictValue.length <= 5) {
            continue;
        }
        buttonNumber++; // to add button name dynamically for new buttons like button-1, button-2, and so on...
        var btn = document.createElement("BUTTON");
        btn.className = "button-" + String(buttonNumber);
        // btn.innerHTML = '<span onclick=addButtonValue()>'+ String(dictValue) +'</span>';
        btn.innerHTML = String(dictValue);
        btn.id = String(buttonNumber);

        // var closeButton = document.createElement("BUTTON");
        // closeButton.className = "button-" + String(buttonNumber);
        // closeButton.innerHTML = '<span onclick=removeClass()>x</span>';
        // closeButton.id = String(buttonNumber);

        entityButtons.appendChild(btn);
        // entityButtons.appendChild(closeButton);
    }

    console.log("Buttons created successfully");
    /*
    THERE IS A BUG :/
    When inserting the button value for the first time into the textarea, it fails and have to be done again.
    Instead, once the entity-buttons div is clicked, everything seem to work properly :)
    So, I am simulating a button click event here (SMORT :D)
    */
    entityButtons.click();
}

function removeClass() {
    var buttons = document.getElementsByTagName("button");
    var buttonsCount = buttons.length;

    for (var i = 0; i <= buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            const btnId = this.id;
            console.log('button id: ', btnId);

            document.getElementById(btnId).remove(); // removes the button consisting entity and other keys
            document.getElementById(btnId).remove(); // removes the 'x' button associated with the previously deleted button
        };
    }
}

const entityBtnNew = document.getElementById('entity-buttons');
entityBtnNew.onclick = somefunc;

function somefunc(){
// function addButtonValue() {
    var buttons = document.getElementsByTagName("button");
    var buttonsCount = buttons.length;

    for (var i = 0; i <= buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            const btnId = this.id;
            console.log('button id: ', btnId);
            var txtarea = document.getElementById("textarea-left");

            var len = txtarea.value.length;

            var start = txtarea.selectionStart; // Obtain the first index of the selected character
            var finish = txtarea.selectionEnd;  // Obtain the last index of the selected character
            
            // when deleting a button, accidental input of button value into textarea-left is guarded
            if (finish - start == 0){
                return 0;
            }

            var cleanedText = String(document.getElementById(btnId).innerText);
            // var cleanedText = selectedTextToString.match(/{([^}]+)}/g); // get the content only within the curly braces of the text
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
        };
    }
}

// const entityBtn = document.getElementById('entity-buttons');
// entityBtn.onclick = function(){
//     var txtarea = document.getElementById("textarea-left");
//
//     var len = txtarea.value.length;
//
//     var start = txtarea.selectionStart; // Obtain the first index of the selected character
//     var finish = txtarea.selectionEnd;  // Obtain the last index of the selected character
//
//     // when deleting a button, accidental input of button value into textarea-left is guarded
//     if (finish - start == 0){
//         return 0;
//     }
//
//     var selectedTextToString = String(entityBtn.innerText);
//     var cleanedText = selectedTextToString.match(/{([^}]+)}/g); // get the content only within the curly braces of the text
//     console.log('cleanedText: ', cleanedText)
//
//     var cleanedTextParsed = JSON.parse(cleanedText);
//
//     // Obtain the selected text
//     var selectedText = txtarea.value.substring(start, finish);
//     const spacePattern = /\s{2,}/g;
//     var emptySpacesSelected = spacePattern.test(selectedText);
//     if (emptySpacesSelected == true){
//         const text = "Selected text is empty or too many whitespaces!";
//         console.warn(text);
//         alert(text);
//         return 0;
//     }
//     console.log('selectedText: ', selectedText)
//     if (cleanedTextParsed.value == undefined){
//         cleanedTextParsed.value = selectedText
//     }
//     var replacedText = selectedText + JSON.stringify(cleanedTextParsed);
//     console.log('replacedText: ', replacedText)
//
//     txtarea.value =  txtarea.value.substring(0,start) + replacedText  + txtarea.value.substring(finish,len);
//
// }

function createText(parsedJsonDataNew) {
    const existingText = document.getElementById("textarea-right"); 

    if (existingText.value == ""){
        existingText.value = parsedJsonDataNew;
    }
    else {
        existingText.value = existingText.value + ", " + parsedJsonDataNew;
    }
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
        alert("The fields are empty")
        return 0;
    }

    // entity name cannot be empty
    if (parsedJsonData.entity == ""){
        // no need to clear the form, as it will be redundant for the users to refill other fields
        alert("entity name is required")
        return 0;
    }

    // delete keys with empty values as they are not required to create buttons
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
    // document.getElementById('textarea-right').value = parsedJsonDataNew;
    console.log("parsedJsonDataNew: ", parsedJsonDataNew)
    // createButton(parsedJsonDataNew);
    
    createText(parsedJsonDataNew);
});
