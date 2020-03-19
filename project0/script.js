const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

var todoArr, cont;

// Fill todoArr with the data stored in the localStorage, if not exist, create an empty array
(function(){
  const todoArrStored = JSON.parse(localStorage.getItem('todoArr'));
  todoArr = todoArrStored || [];
  cont = todoArr.length;
  itemCountSpanUpdate();
  uncheckedCountSpanUpdate();
  renderList();
})()

function newTodo() {
  const text = prompt("Add an item to your TODO list:");
  const todoObj = {
    id: ++cont,
    text,
    checked: false
  }
  createItemListElement(todoObj)
  pushToArrayTodo(todoObj);
  itemCountSpanUpdate();
  uncheckedCountSpanUpdate();
  pushTodoArrayToLocalStorage();
}

function createItemListElement(todoObj){  
  const item_list = document.createElement("LI");
  item_list.classList.add(classNames.TODO_TEXT)
  item_list.setAttribute("id",todoObj.id);
  item_list.innerHTML = todoObj.text;

  const checkboxItemList = document.createElement("INPUT");
  checkboxItemList.setAttribute("type","checkbox");
  checkboxItemList.setAttribute("value",todoObj.id);
  
  if (todoObj.checked) 
    checkboxItemList.setAttribute("checked",1);
  
  checkboxItemList.setAttribute("onClick","checkTodo(this)");
  checkboxItemList.classList.add(classNames.TODO_CHECKBOX)  
  item_list.appendChild(checkboxItemList);
  
  const removeButton = document.createElement("A");
  removeButton.setAttribute("href","javascript: removeItem("+todoObj.id+");");
  removeButton.classList.add(classNames.TODO_DELETE)
  removeButton.innerHTML = "remove";
  item_list.appendChild(removeButton);
  
  list.appendChild(item_list);  
}

function removeItem(id){
  todoArr = todoArr.filter(t => t.id != id)
  renderList();
  uncheckedCountSpanUpdate();
  itemCountSpanUpdate();
}

function renderList(){
  list.innerHTML = "";
  todoArr.map(todoObj => {
    createItemListElement(todoObj)
  })
}

function pushToArrayTodo(todoObj){
  todoArr.push(todoObj)
}

function pushTodoArrayToLocalStorage(){
  localStorage.setItem('todoArr',JSON.stringify(todoArr));
}

function checkTodo(obj){
  todoArr.map(item => { 
    if (item.id == obj.value) 
      item.checked = obj.checked;
  })
  pushTodoArrayToLocalStorage();
  uncheckedCountSpanUpdate();
}

function uncheckedCountSpanUpdate(){
  uncheckedCountSpan.innerHTML = todoArr.filter(item => !item.checked).length;
}

function itemCountSpanUpdate(){
  itemCountSpan.innerHTML = todoArr.length;
}





