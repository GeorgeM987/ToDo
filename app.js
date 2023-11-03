//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(e){
    if(todoInput.value){
        //Prevent form from submitting:
        e.preventDefault()
        //todo-div:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        //Append the li as child to the parrent Div above:
        todoDiv.appendChild(newTodo);
        //add todo to loacal-storage:
        saveLocalTodos(todoInput.value);
        //Check Button:
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Trash Button:
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list UL:
        todoList.appendChild(todoDiv);
        todoInput.value = '';
    }
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;
    //delete to-do item:
    if(item.classList[0] === 'trash-btn'){
        //add animation:
        item.parentElement.classList.add('fall')
        removeLocalTodos(item.parentElement);
        //remove after animation:
        item.parentElement.addEventListener('transitioned', function(){
            item.parentElement.remove();
        })
    }
    //check to-do item:
    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'remaining':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    //Check if there's anything in the local-storage:
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check if there's anything in the local-storage:
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //todo-div:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        //Append the li as child to the parrent Div above:
        todoDiv.appendChild(newTodo);
        //Check Button:
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Trash Button:
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list UL:
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //Check if there's anything in the local-storage:
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}