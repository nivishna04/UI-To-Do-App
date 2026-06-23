let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

displayTasks();

function saveTasks(){
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function addTask(){

const input =
document.getElementById("taskInput");

const text = input.value.trim();

if(text===""){
alert("Please enter a task");
return;
}

tasks.push({
text:text,
completed:false
});

saveTasks();

input.value="";

displayTasks();
}

function displayTasks(){

const list =
document.getElementById("taskList");

const search =
document.getElementById("searchInput")
.value.toLowerCase();

list.innerHTML="";

const filtered = tasks.filter(task=>{

const matchSearch =
task.text.toLowerCase()
.includes(search);

const matchFilter =
currentFilter==="all" ||
(currentFilter==="completed" &&
task.completed) ||
(currentFilter==="pending" &&
!task.completed);

return matchSearch && matchFilter;
});

filtered.forEach(task=>{

const index =
tasks.indexOf(task);

const li =
document.createElement("li");

li.innerHTML=`
<span class="${
task.completed ? "completed":""
}">
${task.text}
</span>

<div class="actions">

<button
class="complete-btn"
onclick="toggleTask(${index})">
✓
</button>

<button
class="edit-btn"
onclick="editTask(${index})">
✏️
</button>

<button
class="delete-btn"
onclick="deleteTask(${index})">
🗑️
</button>

</div>
`;

list.appendChild(li);
});

document.getElementById(
"taskCounter"
).innerText =
`Total Tasks: ${tasks.length}`;
}

function toggleTask(index){

tasks[index].completed =
!tasks[index].completed;

saveTasks();
displayTasks();
}

function editTask(index){

let newTask =
prompt(
"Edit Task",
tasks[index].text
);

if(
newTask!==null &&
newTask.trim()!==""
){
tasks[index].text =
newTask.trim();

saveTasks();
displayTasks();
}
}

function deleteTask(index){

if(confirm("Delete task?")){

tasks.splice(index,1);

saveTasks();
displayTasks();
}
}

function setFilter(filter){
currentFilter = filter;
displayTasks();
  }
