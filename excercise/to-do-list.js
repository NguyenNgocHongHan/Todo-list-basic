const newTodoContainer = document.querySelector('.newTodoContainer');
const editTodoContainer = document.querySelector('.editTodoContainer');
const newBtn = document.querySelector('.newBtn');
const closeAddBtn = document.querySelector('.closeAddBtn');
const closeEditBtn = document.querySelector('.closeEditBtn');
const todoList = document.querySelector('.todoList');
const submitAddForm = document.querySelector('.submitAddForm');
const submitEditForm = document.querySelector('.submitEditForm');
const editBtn = document.querySelector('.eidtBtn');
const deleteBtn = document.querySelector('.deleteBtn');

const checkboxes = document.querySelectorAll('.checkboxes');

const todoAddData = document.getElementById('todoAddData'); //input
const todoEditData = document.getElementById('todoEditData'); //input
const errorAdd = document.getElementById('errorAdd');
const errorEdit = document.getElementById('errorEdit');
const checkAll = document.getElementById('checkAll');

const myArrayTodo = JSON.parse(localStorage.getItem('myJSONTodo'));

let selectAll = false;

const addForm = function () {
    newTodoContainer.classList.add('show');
    newTodoContainer.querySelector('.title').innerText = 'Add new item';
}

const closeAddFunc = function () {
    newTodoContainer.classList.remove('show');
    document.getElementById('todoAddData').value = '';
}

const submitAddFunc = function () {
    if (todoAddData.value === "") errorAdd.innerHTML = "Todo list cannot be blank";
    else {
        newTodoContainer.classList.remove('show');
        myArrayTodo.push({ content: todoAddData.value, check: false });
        localStorage.setItem('myJSONTodo', JSON.stringify(myArrayTodo));
        todoAddData.value = '';
        showTodo();
        location.reload();
    }
}

const deleteFunc = function (index) {
    myArrayTodo.splice(index, 1);
    localStorage.setItem('myJSONTodo', JSON.stringify(myArrayTodo));
    showTodo();
    location.reload();
}

const submitEditFunc = function (index) {
    if (todoEditData.value === "") errorEdit.innerHTML = "Todo list cannot be blank";
    else {
        editTodoContainer.classList.remove('show');
        myArrayTodo[index].content = document.getElementById('todoEditData').value;
        localStorage.setItem('myJSONTodo', JSON.stringify(myArrayTodo));
        showTodo();
        location.reload();
    }
}

const closeEditFunc = function () {
    editTodoContainer.classList.remove('show');
}

const editForm = function (index) {
    editTodoContainer.classList.add('show');
    editTodoContainer.querySelector('.title').innerText = 'Edit item';
    document.getElementById('todoEditData').value = myArrayTodo[index].content;
    submitEditForm.addEventListener('click', (e) => {
        e.preventDefault();
        submitEditFunc(index);
    });
}


let test;
const checkFunc = function (index) {
    test = document.getElementById(`${index}`);
    myArrayTodo[index].check = test.checked;
    localStorage.setItem('myJSONTodo', JSON.stringify(myArrayTodo));
    showTodo();
    location.reload();
}


const showTodo = function () {
    let LI;
    if (myArrayTodo.length > 0) {
        LI = `<table>`;
        LI += `<tr>
                    <td><input type="checkbox" id="checkAll" ${selectAll === true ? "checked" : "unchecked"} /></td>
                    <td style="font-size: small; font-weight: bold; text-align: center;">Check All</td>
                </tr>`
        for (row in myArrayTodo) {
            LI += `<tr>
                    <td>
                        <input type="checkbox" onclick="checkFunc(${row})" class="checkboxes" id="${row}" ${myArrayTodo[row].check === true ? "checked" : "unchecked"}/>
                    </td>
                    <td class = "item">
                        <button class="editBtn" onclick="editForm(${row})"><i class="fas fa-pencil"></i></button>
                        <button class="deleteBtn" onclick="deleteFunc(${row})"><i class="fas fa-trash-alt"></i></button>
                    </td>
                    <td class = "sNo">${Number(row) + 1}</td>
                    <td class = "itemList todoItem todoTitle">${myArrayTodo[row].content}</td>
                </tr>`;
        }
        LI += ` </table>`;
    }
    else {
        LI = `<p style="text-align: center;">You don't have any task</p>`;
    }
    todoList.innerHTML = LI;
}

const checkAllFunc = function () {
    let count = 0;
    for (row in myArrayTodo) {
        if (myArrayTodo[row].check === true) count++;
    }
    if (count === myArrayTodo.length) { selectAll = true; }
    else selectAll = false;
}

checkAllFunc();
showTodo();

console.log(myArrayTodo);

newBtn.addEventListener('click', addForm);
closeAddBtn.addEventListener('click', closeAddFunc);
closeEditBtn.addEventListener('click', closeEditFunc);
submitAddForm.addEventListener('click', () => {
    submitAddFunc();
    localStorage.setItem('myJSONTodo', JSON.stringify(myArrayTodo));
});

document.getElementById('checkAll').addEventListener('click', function (e) {
    selectAll = e.target.checked;
    for (row in myArrayTodo) {
        myArrayTodo[row].check = selectAll;
        localStorage.setItem('myJSONTodo', JSON.stringify(myArrayTodo));
    }

    showTodo();
    location.reload();

    console.log(e.target.checked);
    console.log(selectAll);
});
