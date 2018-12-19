const todoForm = document.querySelector('.todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todo-list');

const TODOS = 'toDos';

let toDos = [];

function filterFn(toDo) {
  return todoForm.id === 1;
}

function handleCickDelete(e) {
  // console.log(e.dir);
  // console.log(e.target.parentElement)
  const btn = e.target;
  const li = btn.parentElement;
  todoList.removeChild(li);
  cleanToDos = toDos.filter(function(toDo) {
    // console.log(toDo.id, parseInt(li.id))
    // return toDo.id !== li.id;
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  delBtn.innerText = 'Delete';
  delBtn.addEventListener('click', handleCickDelete);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj);
  saveToDos()
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = todoInput.value;
  todoInput.value = '';
  paintTodo(currentValue);
}

function loadTodos() {
  const loadedToDos = localStorage.getItem(TODOS);
  if (loadedToDos !== null) {
    // console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintTodo(toDo.text);
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener('submit', handleSubmit);
}

init();

