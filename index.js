'use strict';
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
const clearCompleteHref = document.querySelector('.clear-complete-href');

const checkboxes = document.querySelectorAll('.checkboxes');

const contentCreate = document.getElementById('content-create'); //input
const contentEdit = document.getElementById('content-edit'); //input
const errorAdd = document.getElementById('errorAdd');
const errorEdit = document.getElementById('errorEdit');
const checkAll = document.getElementById('checkAll');

const listTask = JSON.parse(localStorage.getItem('listTodo')) == null ? [] : JSON.parse(localStorage.getItem('listTodo'));

let selectAll = false;

const createForm = function () {
    newTodoContainer.classList.add('show');
    newTodoContainer.querySelector('.title').innerText = 'Add new item';
}

const closeCreateForm = function () {
    newTodoContainer.classList.remove('show');
    document.getElementById('content-create').value = '';
    errorAdd.remove();
}

const submitCreate = function () {
    if (contentCreate.value === '') errorAdd.innerHTML = 'Todo list cannot be blank';
    else {
        newTodoContainer.classList.remove('show');
        listTask.push({ content: contentCreate.value, check: false });
        localStorage.setItem('listTodo', JSON.stringify(listTask));
        contentCreate.value = '';
        showTodo();
    }
}

const deleteFunc = function (index) {
    listTask.splice(index, 1);
    localStorage.setItem('listTodo', JSON.stringify(listTask));
    showTodo();
}

const submitEdit = function (index) {
    if (contentEdit.value === '') errorEdit.innerHTML = "Todo list cannot be blank";
    else {
        editTodoContainer.classList.remove('show');
        listTask[index].content = contentEdit.value;
        localStorage.setItem('listTodo', JSON.stringify(listTask));
    }
}

const closeEditFunc = function () {
    editTodoContainer.classList.remove('show');
}

const editForm = function (index) {
    editTodoContainer.classList.add('show');
    editTodoContainer.querySelector('.title').innerText = 'Edit item';
    document.getElementById('content-edit').value = listTask[index].content;
    submitEditForm.addEventListener('click', () => {
        submitEdit(index);
        if (!(contentEdit.value === '')) location.reload();
    });
    contentEdit.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitEdit(index);
            if (!(contentEdit.value === '')) location.reload();
        }
    });
}


let temp;
const check = function (index) {
    temp = document.getElementById(`${index}`);
    listTask[index].check = temp.checked;
    localStorage.setItem('listTodo', JSON.stringify(listTask));
    showTodo();
}

const checkAllFunc = function () {
    let count = 0;
    listTask.forEach((task, index) => {
        if (task.check === true) count++;
    });
    if (count === listTask.length) { selectAll = true; }
    else selectAll = false;
}

const checkAllBtn = function () {
    selectAll = document.getElementById('checkAll').checked;
    listTask.map((task) => task.check = selectAll);
    localStorage.setItem('listTodo', JSON.stringify(listTask));
    showTodo();
}

const clearComplete = function () {
    listTask.splice(listTask.findIndex(task => task.check === true));
    localStorage.setItem('listTodo', JSON.stringify(listTask));
    showTodo();
};

const itemLeft = function () {
    let count = 0;
    listTask.map((task, item) => {
        if (!task.check) count++;
    });
    return count;
};

const showTodo = function () {
    let LI;
    if (listTask.length > 0) {
        checkAllFunc();
        LI = `<div class="table-list">
                <table>`;
        LI += `<thead>
                    <tr>
                        <th class="btn-group">
                            <p style="font-size:small;">Check All</p>
                            <input type="checkbox" onclick="checkAllBtn()" id="checkAll" ${selectAll === true ? "checked" : "unchecked"} />
                        </th>
                        <th>No.</th>
                        <th>Task</th>
                        <th><a href="#" class="clear-complete-href" onclick="clearComplete()">Clear completed</a></th>
                    </tr>
                </thead>`;
        LI += `<tbody>`;
        listTask.forEach((task, index) => {
            LI += `<tr>
                        <td style="text-align:center; width: 10%;">
                            <input type="checkbox" onclick="check(${index})" class="checkboxes" id="${index}" ${task.check === true ? "checked" : "unchecked"}/>
                        </td>
                        <td class="sNo" style="width: 10%; text-align:center;">${index + 1}</td>
                        <td class="task-content">${task.content}</td>
                        <td style=" width: 10%;" class = "item">
                            <button class="editBtn" onclick="editForm(${index})"><i class="fas fa-pencil"></i></button>
                            <button class="deleteBtn" onclick="deleteFunc(${index})"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>`;
        });
        LI += `</tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">${itemLeft()} item left</td>
                    </tr>
                </tfoot>`
        LI += ` </table>
                </div>`;
    }
    else {
        LI = `<p style="text-align: center;">You don't have any task</p>`;
    }

    todoList.innerHTML = LI;
}

showTodo();

newBtn.addEventListener('click', createForm);
closeAddBtn.addEventListener('click', closeCreateForm);
closeEditBtn.addEventListener('click', closeEditFunc);
submitAddForm.addEventListener('click', () => {
    submitCreate();
});
contentCreate.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitCreate();
    }
});

if (listTask.length > 0) {
    document.getElementById('checkAll').addEventListener('click', function (e) {
        if (e.target.checked === true) {
            selectAll = true;
            listTask.forEach((task, index) => {
                task.check = selectAll;
                localStorage.setItem('listTodo', JSON.stringify(listTask));
            });
        }
        showTodo();
    });
}
