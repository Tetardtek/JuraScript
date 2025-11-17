// TODO TASK MANAGER

// SELECTEURS
const button = document.querySelector(`.button`);
const todoList = document.querySelector(`.todo`);
const filterList = document.querySelector(".filter-category");
const allTaskBtn = document.querySelector("#all-task");
const achievedTaskBtn = document.querySelector("#achieved-task");
const standbyTaskBtn = document.querySelector("#standby-task");

//ECOUTEURS

todoList.addEventListener(`click`, checkDelete);

filterList.addEventListener("input", filterCategoryHandler);

allTaskBtn.addEventListener('click', showAllCategory);
achievedTaskBtn.addEventListener('click', showAchievedCategory);
standbyTaskBtn.addEventListener('click', showStandByCategory);

// clear.addEventListener("click", function(){
//   location.reload();
// });

button.addEventListener(`click`, (e) => {
  e.preventDefault();
  const input = document.querySelector(`.input`);
  createHtmlTask(input.value);
  
  localStorage.setItem(input.value, 0);
  todoCounter();
  input.value = ``;
});

//FONCTIONS

function getAllStorage() {
  const archive = []
  const keys = Object.keys(localStorage)

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== "achievedCount" && keys[i] !== "standbyCount"){
    archive.push({taskName: keys[i], state: localStorage.getItem(keys[i])})
  }
}

  return archive;
}

function createHtmlTask (taskName) {
  
  const listTask = document.createElement("listTask")
  listTask.classList.add("task")

  const newTask = document.createElement(`li`);
  newTask.classList.add(`newTask`)
  newTask.innerText = taskName;
  listTask.appendChild(newTask);

  const confirmButton = document.createElement("button")
  confirmButton.innerHTML = '<i class="fas fa-check"></i>'
  confirmButton.classList.add('check-btn')
  listTask.appendChild(confirmButton)

  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
  deleteButton.classList.add('delete-btn')
  listTask.appendChild(deleteButton)

  todoList.appendChild(listTask)
};



function checkDelete(event) {
  const item = event.target
  const task = item.parentElement

  if (item.classList.contains("check-btn")) {
    task.classList.add("achieved");
    todoCounter();

  } else if (item.classList.contains("delete-btn")) {
    task.classList.add("transighost");
    task.addEventListener("transitionend", function () {
      task.remove();
      todoCounter()
    });
  }
}

// Fonction de traitement de l'évenement lors du clic sur le select
function filterCategoryHandler(e) {
  // Appel de la fonction de filtrage avec la valeur de l'évenement
  filterCategory(e.target.value)
}

function showAllCategory(){
  filterCategory("all")
}
function showAchievedCategory(){
  filterCategory("achieved")
}
function showStandByCategory(){
  filterCategory("standby")
}


function filterCategory(value) {
  const tasks = todoList.querySelectorAll(".task");

  tasks.forEach(function (task) {

    switch (value) {
      case "all":
        task.style.display = "flex";
        break;
      case "achieved":
        if (task.classList.contains("achieved")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "standby":
        if (!task.classList.contains("achieved")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

// MAJ les compteurs dans localStorage

const clearButton = document.getElementById("clear-button");
let achievedCount = 0;
let standbyCount = 0;

function todoCounter() {
  const counterAchieved = document.getElementById("counter-achieved");
  const counterStandby = document.getElementById("counter-standby");
  const tasks = todoList.querySelectorAll(".task");
  

  achievedCount = 0;
  standbyCount = 0;

  tasks.forEach((task) => {
    if (task.classList.contains("achieved")) {
      achievedCount++;
    } else {
      standbyCount++;
    }
  });

  localStorage.setItem("achievedCount", achievedCount);
  localStorage.setItem("standbyCount", standbyCount);

  counterAchieved.textContent = achievedCount;
  counterStandby.textContent = standbyCount;

}

  // Ajout du bouton Clear pour refresh les compteurs
clearButton.addEventListener("click", () => {
  localStorage.clear();
  console.log("toto");
  location.reload()
  console.log("toto")
});

// chargement de la page 

document.addEventListener("DOMContentLoaded", () => {
  const counterAchieved = document.getElementById("counter-achieved");
  const counterStandby = document.getElementById("counter-standby");
  const counters = getCounter();
  const data = getAllStorage();

  data.forEach((Element) => {
    createHtmlTask(Element.taskName)
  }) 

  counterAchieved.textContent = counters.achievedCount;
  counterStandby.textContent = counters.standbyCount;

});


// pour récupérer les compteurs du localStorage

function getCounter() {

  const achievedCount = localStorage.getItem("achievedCount") || 0;
  const standbyCount = localStorage.getItem("standbyCount") || 0;
  return { achievedCount: parseInt(achievedCount), standbyCount: parseInt(standbyCount) };
}

// ajout de la date

const dateElement = document.getElementById("date");
const options = {weekday : "long", month:"long", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("fr-FR", options);


