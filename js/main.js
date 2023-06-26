// TODO: show warning on page refresh
// window.onbeforeunload = () => {
//   return "Your date will be lost, are you sure?";
// };

const btn = document.getElementById('submit');
const form = document.getElementById('entity-form');
console.log(btn);


let createButton = (parsedJsonData) => {
    const someDiv = document.getElementById("entity-buttons");
    const btn = document.createElement("BUTTON");
    btn.innerHTML = parsedJsonData;
    someDiv.appendChild(btn);
    console.log("---called successfully---");
};

const newBtn = document.getElementById('entity-buttons');

newBtn.onclick = function(){
    var txtarea = document.getElementById("textarea-left");

    var len = txtarea.value.length;

    // Obtain the index of the first selected character
    var start = txtarea.selectionStart;

    // Obtain the index of the last selected character
    var finish = txtarea.selectionEnd;

    var selectedTextToString = String(newBtn.innerText);
    var cleanedText = selectedTextToString.match(/{([^}]+)}/g);
    var cleanedTextParsed = JSON.parse(cleanedText);

    // Obtain the selected text
    var selectedText = txtarea.value.substring(start, finish);
    if (cleanedTextParsed['value'] === ""){
        cleanedTextParsed.value = selectedText
    }
    var replacedText = selectedText + JSON.stringify(cleanedTextParsed);
    console.log('cleanedText: ', cleanedText)
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

form.addEventListener('submit', (e) => {
    // prevent the form from submitting
    e.preventDefault();

    // show the form values
    const formData = new FormData(form);
    const values = [...formData.entries()];
    console.log(values);

    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    const parsedJsonData = JSON.parse(jsonData);
    console.log(parsedJsonData);
    console.log(parsedJsonData["entity"]);
    // if(!parsedJsonData["entity"] == "" && !parsedJsonData["value"] == "" && !parsedJsonData["group"] == "" && !parsedJsonData["role"] == ""){
    //     document.getElementById('textarea-up').value = jsonData;
    //     createButton(jsonData);
    // }
    if(parsedJsonData["entity"] == "" && parsedJsonData["value"] == "" && parsedJsonData["group"] == "" && parsedJsonData["role"] == ""){
        console.log("Everything is empty");
        return 0;
    }
    document.getElementById('textarea-up').value = jsonData;
    createButton(jsonData);
});

