// UI Değişkenlerini Tanımlama

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

// Tüm Olay Dinleyicilerini Yükleme
function loadEventListeners() {
  // DOM Yükleme Olayı
  document.addEventListener("DOMContentLoaded", getTasks);
  // Görev Ekleme Olayı
  form.addEventListener("submit", addTask);
  // Görev Kaldırma Olayı
  taskList.addEventListener("click", removeTask);
  // Tüm Görevleri Kaldırma
  clearBtn.addEventListener("click", clearTasks);
  // Görevleri Filtreleme Olayı
  filter.addEventListener("keyup", filterTasks);
}

// Görevleri Local Storage'dan Alma
function getTasks() {
  
  let tasks;

  tasks = checkLocalStorage();

  if (tasks != null) {
    tasks.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
    });
  }
}

// Görev Ekleme
function addTask(e) {
  
  const control = checkTasks(taskInput.value);

  if (taskInput.value === "") {
    alert("Bir görev giriniz.");
  } else if (control) {
    alert("Bu görevi girdiniz.");
  } else {
    
    // li Elementi Oluşturma
    const li = document.createElement("li");
    // Sınıf Ekleme
    li.className = "collection-item";
    // Text Node Oluşturma ve li'ye Ekleme
    li.appendChild(document.createTextNode(taskInput.value));
    // Yeni link Elementi Oluşturma
    const link = document.createElement("a");
    // Sınıf Ekleme
    link.className = "delete-item secondary-content";
    // İkon Html Ekleme
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // link'i li'ye Ekleme
    li.appendChild(link);

    // li'yi ul'e Ekleme
    taskList.appendChild(li);

    // Local Storage'a Kaydetme
    storeTaskInLocalStorage(taskInput.value);

    // Input'u temizleme
    taskInput.value = "";
  }

  e.preventDefault();
}

// Görev Kaydetme
function storeTaskInLocalStorage(task) {
  
  let tasks;

  tasks = checkLocalStorage();

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görev Silme
function removeTask(e) {
  
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Son kararın mı?")) {
      e.target.parentElement.parentElement.remove();

      // Local Storage'dan Kaldırma
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Local Storage'dan Kaldırma
function removeTaskFromLocalStorage(taskItem) {
  
  let tasks;

  tasks = checkLocalStorage();

  if (tasks != null) {
    tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });
  }

  if (tasks.length === 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Hepsini Silme
function clearTasks() {
  //taskList.innerHTML = '';

  // Daha Hızlı Yöntem
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Local Storage'dan Silme
  localStorage.clear();
}

// Görevleri Filtreleme
function filterTasks(e) {
  
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Görevleri KontrolEtme
function checkTasks(text) {
  
  let flag;

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text.toLowerCase()) != -1) {
      flag = true;
    } else {
      flag = false;
    }
  });

  return flag;
}

// Local Storage Kontrolü
function checkLocalStorage() {
 
  if (localStorage.getItem("tasks") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("tasks"));
  }
}
