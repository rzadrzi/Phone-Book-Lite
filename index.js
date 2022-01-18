
var dom = {
    'Ebtn': document.querySelector("#Ebtn"),
    'Sbtn': document.querySelector("#Sbtn"),
    'name': document.querySelector("#name"),
    'phoneNumber': document.querySelector("#phone-number"),
    'table': document.querySelector("#table"),
    'tbody': document.querySelector("#tbody"),
    'insertForm': document.querySelector("#insert-form"),
    'searchDiv': document.querySelector("#search-div"),
    'Searchbtn': document.querySelector("#Searchbtn"),
    'searchInpu': document.querySelector("#searchInpu"),
    'tableDiv': document.querySelector("#table-div"),
    'searchTbody': document.querySelector("#search-tbody"),
    'searchTable': document.querySelector("#search-table")
};

var data = {
    'name': null,
    'phoneNumber': null
};

var myStorage = window.localStorage;
var len = myStorage.length;

if (len===0){
    dom.table.style.display='none';
    dom.searchDiv.style.display = 'none';
}

function createTableItem(len, name, phoneNumber) {
    var tr = document.createElement("tr");

    tr.innerHTML = `
    <th scope='row'>${len + 1}</th>
    <td>${name}</td>
    <td>${phoneNumber}</td>
    <td><a class='btn btn-secondary' href='#' onclick="onClickEdit('${name}')">Edit</a></td>
    <td><a class='btn btn-danger' href='#' onclick="onClickDelete('${name}')">Delete</a></td>`

    dom.tbody.appendChild(tr)
}

function createSearchTableItem( name, phoneNumber) {
    var tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${name}</td>
    <td>${phoneNumber}</td>`

    dom.searchTbody.appendChild(tr)
}

// Read All Data
let i = 0;

Object.keys(myStorage).forEach(key => {
    createTableItem(i, key, myStorage.getItem(key))
    i++
})

// Delete
function onClickDelete(name) {
    myStorage.removeItem(name);
    location.reload();
}

// Edit
function onClickEdit(name) {
    dom.name.value = name;
    dom.phoneNumber.value = myStorage.getItem(name);
    dom.Ebtn.style.display='block';
    dom.Sbtn.style.display='none';
    myStorage.removeItem(name);
    // location.reload();
}

// Create and Save after Editing
function btnSave() {
    data.name = dom.name.value;
    data.phoneNumber = dom.phoneNumber.value;
    console.log(data.name);
    if (data.name == null || data.phoneNumber == null) {
        console.error('Please enter an data')
    };

    var check = myStorage.getItem(data.name)

    if (check == null) {
        myStorage.setItem(data.name, data.phoneNumber);
        createTableItem(myStorage.length, data.name, data.phoneNumber)

    } else {
        console.error("This name existed before!")
    }
    location.reload();
}

// Read only one item
function searchItem() {

    Object.keys(myStorage).forEach(key => {
        let result = key.includes(dom.searchInpu.value);

        if(result){

            dom.table.style.display='none';  
            dom.searchTable.style.display='block';

            createSearchTableItem(key, myStorage.getItem(key));
        }
    })

}

