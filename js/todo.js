document.addEventListener('DOMContentLoaded', function() {
    // Загрузка задач из localStorage
    let tasks = JSON.parse(localStorage.getItem('travelTasks')) || [];
    
    // Элементы DOM
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskList = document.getElementById('taskList');
    const sortSelect = document.getElementById('sortSelect');
    
    // Функции
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.selected ? 'checked' : ''} 
                    onchange="toggleSelect(${task.id})">
                <span onclick="toggleComplete(${task.id})">${task.text}</span>
                <span class="task-date">${task.date || 'Без даты'}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
            `;
            taskList.appendChild(li);
        });
    }
    
    function addTask() {
        if (taskInput.value.trim() === '') return;
        
        tasks.push({
            id: Date.now(),
            text: taskInput.value.trim(),
            date: taskDate.value,
            completed: false,
            selected: false
        });
        
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskDate.value = '';
    }
    
    function saveTasks() {
        localStorage.setItem('travelTasks', JSON.stringify(tasks));
    }
    
    // Привязка событий
    window.addTask = addTask;
    window.toggleComplete = function(id) {
        tasks = tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        );
        saveTasks();
        renderTasks();
    };
    
    window.toggleSelect = function(id) {
        tasks = tasks.map(task => 
            task.id === id ? {...task, selected: !task.selected} : task
        );
        saveTasks();
    };
    
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };
    
    window.deleteSelected = function() {
        tasks = tasks.filter(task => !task.selected);
        saveTasks();
        renderTasks();
    };
    
    window.sortTasks = function() {
        const sortBy = sortSelect.value;
        tasks.sort((a, b) => sortBy === 'date' 
            ? (a.date || '').localeCompare(b.date || '') 
            : a.text.localeCompare(b.text));
        renderTasks();
    };
    
    // Первоначальная загрузка
    renderTasks();
});