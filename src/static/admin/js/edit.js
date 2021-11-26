function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    const form = document.getElementById("myForm");
    form.removeChild(form.children[0]);
    newForm = document.createElement("form");
    form.classList.add("form-container");
    form.appendChild(newForm);
    form.style.display = "none"
} 

function getForm(rowid) {
    const row = document.getElementById(rowid);
    const form = document.getElementById("myForm");
    form.removeChild(form.children[0]);
    newForm = document.createElement("form");
    form.classList.add("form-container");
    form.appendChild(newForm);
    var foo = form.children[0];
    const h1 = document.createElement("h1");
    h1.innerHTML = "Edit";
    foo.appendChild(h1);
    const attr = row.parentElement.children[0].children;
    for (let i = 1; i<attr.length-2; i++) {

        // Create Labels
        var label = document.createElement("label");
        label.setAttribute("for", attr[i].innerHTML);
        label.innerHTML = attr[i].innerHTML;
        label.setAttribute("style", "font-weight:normal");
        foo.appendChild(label);

        // Break Tags
        const brk1 = document.createElement("br");
        foo.appendChild(brk1);

        // Create inputs
        var element = document.createElement("input");
        if (attr[i].innerHTML == "Date of Joining") {
            element.setAttribute("type", "date");
            element.setAttribute("placeholder", "dd-mm-yyyy");
        }
        else {
            element.setAttribute("type", "text");
            element.setAttribute("placeholder", row.children[i].innerHTML);
        }
        element.name = attr[i].innerHTML;
        element.id = row.children[i].className;
        element.style.width = "200px";
        foo.appendChild(element);
        
        // Break Tags
        const brk2 = document.createElement("br");
        foo.appendChild(brk2);
    }

    var subbutton = document.createElement("button");
    subbutton.classList.add("btn");
    subbutton.setAttribute("type", "submit");
    subbutton.setAttribute("onclick", "submitForm('"+rowid+"')");
    subbutton.innerHTML = "Confirm";

    var canbutton = document.createElement("button");
    canbutton.classList.add("btn");
    canbutton.classList.add("cancel");
    canbutton.setAttribute("onclick", "closeForm()");
    canbutton.innerHTML = "Cancel";

    foo.appendChild(subbutton);
    foo.appendChild(canbutton);

    openForm();
}

function submitForm(rowid) {
    var form = document.getElementById("myForm");
    var formEle = form.children[0].children
    var params = {"main": rowid};
    for (let i = 0; i<formEle.length; i++){
        if(formEle[i].nodeName == "INPUT"){
            var key = formEle[i].id;
            var val = formEle[i].value;
            if (val != ""){
                params[key] = val;
            }
        }
        else{
            continue;
        }
    }
    if (Object.keys(params).length > 1){
        submitApi(params);
        closeForm();
    }
    else {
        alert("Enter at least one value to be edited");
        closeForm();
        getForm(rowid);
    }
    
}

function submitApi(params) {
    console.log(params);
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8080/api/modify";
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application-json');
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
            console.log("done");
            location.reload();
        }
        else if (this.status == 403) {
            alert(this.responseText)
        }
        else {
            console.log("error");
            console.log(this.status, this.responseText)
        }
    }
    xhr.send(JSON.stringify(params));
}

function deleteRow(rowid) {
    boo = confirm("Are you sure about deleting this record?");
    if (boo == true) {
        var xhr = new XMLHttpRequest();
        var params = {"main": rowid}
        var url = "http://127.0.0.1:8080/api/delete";
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application-json');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                console.log("done");
                location.reload();
            }
            else if (this.status == 403) {
                alert(this.responseText)
            }
            else {
                console.log("error");
                console.log(this.status, this.responseText)
            }
        }
        xhr.send(JSON.stringify(params));
    }
}