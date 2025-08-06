document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // โหลดข้อมูลงานที่บันทึกไว้เมื่อหน้าเว็บโหลดเสร็จ
    loadTasks();

    // เพิ่มงานใหม่
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks(); // บันทึกข้อมูลหลังจากเพิ่มงาน
        }
    });

    // เพิ่มงานเมื่อกด Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // สร้าง Element ของงาน
    function addTask(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button">ลบ</button>
        `;
        if (isCompleted) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);

        // ติ๊กงานที่เสร็จแล้ว
        li.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
                saveTasks(); // บันทึกข้อมูลหลังจากเปลี่ยนสถานะ
            }
        });

        // ลบงาน
        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
            saveTasks(); // บันทึกข้อมูลหลังจากลบงาน
        });
    }

    // ฟังก์ชันสำหรับบันทึกงานลงใน Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ฟังก์ชันสำหรับโหลดงานจาก Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                addTask(task.text, task.completed);
            });
        }
    }
});