document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // เพิ่มงานใหม่
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // เพิ่มงานเมื่อกด Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // สร้าง Element ของงาน
    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button">ลบ</button>
        `;
        taskList.appendChild(li);

        // ติ๊กงานที่เสร็จแล้ว
        li.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
            }
        });

        // ลบงาน
        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
        });
    }
});