const todoForm = document.querySelector('.todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todo-list');
const btnAllDelete = document.querySelector('.todo-all-delete');

const TODOS = 'toDos';

let toDos = [];

function filterFn(toDo) {
  return todoForm.id === 1;
}

function updateTodos() {
  if (toDos.length < 1) {
    btnAllDelete.style.display = 'none';
  } else {
    btnAllDelete.style.display = 'block';
  }
}

function handleCickDelete(e) {
  const btn = e.target;
  const li = btn.parentElement;
  todoList.removeChild(li);
  cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
  updateTodos();
}

function paintTodo(todo) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  delBtn.innerText = 'Delete';
  delBtn.addEventListener('click', handleCickDelete);
  const date = new Date(todo.date);
  li.innerText = todo.text + ' ' + date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDay() + '일';
  li.id = todo.id;
  li.appendChild(span);
  li.appendChild(delBtn);
  todoList.appendChild(li);
  toDos.push(todo);  
  saveToDos()
}

function handleDeleteAll() {
  toDos = [];
  saveToDos();
  const lis = todoList.querySelectorAll('li');
  lis.forEach(function(li) {
    li.remove();
  })
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = todoInput.value;
  todoInput.value = '';
  const newTodos = {
    id: toDos.length,
    date: new Date(),
    text: currentValue
  }
  paintTodo(newTodos);
}

function loadTodos() {
  const loadedToDos = localStorage.getItem(TODOS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintTodo(toDo);
    });
  } 
}

function init() {
  loadTodos();
  updateTodos();
  todoForm.addEventListener('submit', handleSubmit);
  btnAllDelete.addEventListener('click', handleDeleteAll);
}

init();

