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
        element.style.width = "200px";
        foo.appendChild(element);
        
        // Break Tags
        const brk2 = document.createElement("br");
        foo.appendChild(brk2);
    }

    var subbutton = document.createElement("button");
    subbutton.classList.add("btn");
    subbutton.setAttribute("type", "submit");
    subbutton.onclick = {};
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