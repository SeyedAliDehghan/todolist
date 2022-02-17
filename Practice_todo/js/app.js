// localStorage.clear();
// Count Todos
//  === Selectors ===
var root = document.querySelector(':root');

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
//const filterOption = document.querySelector('.filter-todo');
const filterAll = document.getElementsByClassName('allFilter');
const filterActive = document.getElementsByClassName('activeFilter');
const filterCompleted = document.getElementsByClassName('completedFilter');
const clearComplete = document.querySelector('.clearComplete');
const todoCount = document.querySelector('.todoCount');
const container = document.querySelector('.container');

const icon = document.querySelector('.icon');

// === Event Listeners ===
icon.addEventListener('click', switchTheme);
filterAll[0].addEventListener('click', allFilter);
filterActive[0].addEventListener('click', activeFilter);
filterCompleted[0].addEventListener('click', completedFilter);
filterAll[1].addEventListener('click', allFilter);
filterActive[1].addEventListener('click', activeFilter);
filterCompleted[1].addEventListener('click', completedFilter);
clearComplete.addEventListener('click', clearCompleteFunction);
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', checkTheme);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//filterOption.addEventListener('click', filterTodo)

// === Functions ====

function addTodo(event) {
    // dont reload page => prevent form from submitting
    event.preventDefault();
    // Create Todo li
    const todoDiv = document.createElement('li');
    todoDiv.classList.add('todo');

    // Check mark button
    const completedButton = document.createElement('button');
    // completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Create Li
    const newTodo = document.createElement('span');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-times"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // Clear Todo Input
    todoInput.value = "";
    // Count Todos
    todoCountFunction()
}

function deleteCheck(event) {
    const item = event.target;
    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();

    }
    // Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;

        done(todo);
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";

                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "active":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
        }
    });
}

function allFilter(e) {
    filterAll[0].classList.toggle("bold")
    filterActive[0].classList.remove("bold")
    filterCompleted[0].classList.remove("bold")
    filterAll[1].classList.toggle("bold")
    filterActive[1].classList.remove("bold")
    filterCompleted[1].classList.remove("bold")
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        todo.style.display = "flex";
    });
}

function activeFilter(e) {
    filterAll[0].classList.remove("bold")
    filterActive[0].classList.toggle("bold")
    filterCompleted[0].classList.remove("bold")
    filterAll[1].classList.remove("bold")
    filterActive[1].classList.toggle("bold")
    filterCompleted[1].classList.remove("bold")
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (!todo.classList.contains('completed')) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
}

function completedFilter(e) {
    filterAll[0].classList.remove("bold")
    filterActive[0].classList.remove("bold")
    filterCompleted[0].classList.toggle("bold")
    filterAll[1].classList.remove("bold")
    filterActive[1].classList.remove("bold")
    filterCompleted[1].classList.toggle("bold")
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.classList.contains('completed')) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
}

function saveLocalTodos(todo) {
    // CHECK IS IT ON LOCAL ANYTHING?
    let todos = checkLocalStorage();
    todos.push([todo, false]);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    // Count Todos
    todoCountFunction()
    let todos = checkLocalStorage();
    let counter = -1;
    todos.forEach(function (todo) {
        counter++;
        //console.log(todo[counter]);
        // Create Todo Div
        const todoDiv = document.createElement('li');
        todoDiv.classList.add('todo');
        if (todos[counter][1] === true) {
            todoDiv.classList.add('completed');
        }
        // Check mark button
        const completedButton = document.createElement('button');
        // completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        if (todos[counter][1] === true) {
            completedButton.classList.add('completedBtn');
        }
        todoDiv.appendChild(completedButton);
        // Create Li
        const newTodo = document.createElement('span');
        newTodo.innerText = todo[0];
        newTodo.classList.add('todo-item');
        if (todos[counter][1] === true) {
            newTodo.classList.add('lowOpacity');
        }
        todoDiv.appendChild(newTodo);
        // Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-times"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // append to list
        todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo) {

    let todos = checkLocalStorage();
    let indx;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i][0] === todo.children[1].innerText) {
            indx = i;
        }
    }
    // const todoIndex = todo.children[0].innerText;
    todos.splice(indx, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    // Count Todos
    todoCountFunction()
}

function checkLocalStorage(todos) {
    if (localStorage.getItem('todos') === null) {
        return todos = [];
    } else {
        return todos = JSON.parse(localStorage.getItem('todos'));
    }
}

function done(todo) {

    todo.classList.toggle("completed");
    todo.children[0].classList.toggle("completedBtn");
    todo.children[1].classList.toggle("lowOpacity");
    let todos = checkLocalStorage();
    const todoIndex = todo.children[1].innerText;
    let fIndex;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i][0] === todo.children[1].innerText) {
            fIndex = i;
        }
    }
    // console.log(fIndex)
    if (!todos[fIndex][1] === true) {
        todos[fIndex][1] = true;
    } else {
        todos[fIndex][1] = false;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
    // Count Todos
    todoCountFunction()
}

function clearCompleteFunction() {
    let todos = checkLocalStorage();
    // // console.log(todoList.children[1].classList.contains('completed'));
    // let doneIndx=[];
    // console.log(todoList.children[1].innerText);
    // console.log(todos[0][0])
    // for (let i=0;i<todos.length;i++){
    //     if (todoList.children[i].classList.contains('completed')){
    //         console.log("counted")
    //         for (let j=0;j<todos.length;j++){
    //             if (todos[j][0]===todoList.children[i].innerText){
    //                 todos.splice(j,1);
    //                 todoList.children[i].remove();
    //                 localStorage.setItem('todos', JSON.stringify(todos));
    //                 i++;
    //             }
    //         }
    //     }
    //     todos = checkLocalStorage();
    // }

    const completedToDos = document.querySelectorAll(".completed")
    completedToDos.forEach(todo => {
        todo.remove();
        // console.log(todo.children[1].innerText);
        for (let i=0;i<todos.length;i++) {
            if (todos[i][0] === todo.children[1].innerText){
                todos.splice(i,1);

            }
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
// Count Todos
todoCountFunction()
// todoList.childNodes[i].remove();
}

function todoCountFunction() {
    let todos = checkLocalStorage();
    let count = 0;
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i][1] === true) {
            count++;
        }
    }
    todoCount.innerText = count;
}

function switchTheme() {
    if (icon.classList.contains('moon')) {
        goDark()

    } else if (icon.classList.contains('sun')) {
        goLight()

    }
}

function goDark() {
    icon.classList.remove('moon')
    icon.classList.add('sun');
    container.style.backgroundImage = "url('img/bg-dark.png')";
    document.body.style.background = "#161722";
    root.style.setProperty('--primary', "#25273C")
    root.style.setProperty('--third', "#49494f")

    root.style.setProperty('--text-color', "#c5c5c5")

    localStorage.setItem("theme", "dark")
}

function goLight() {
    icon.classList.remove('sun');
    icon.classList.add('moon')
    container.style.backgroundImage = "url('img/bg.jpg')";
    root.style.setProperty('--primary', "white")
    document.body.style.background = "white";
    root.style.setProperty('--primary', "#fff")
    root.style.setProperty('--third', "#e4e5f1")
    root.style.setProperty('--text-color', "#5e5e5e")
    localStorage.setItem("theme", "light")
}

function checkTheme() {
    if (localStorage.getItem('theme') === null) {
        goLight()
        // console.log("red")

    } else {
        if (localStorage.getItem('theme') === 'light') {
            goLight();
        } else {
            goDark();
        }
    }
    // localStorage.getItem('theme')
}