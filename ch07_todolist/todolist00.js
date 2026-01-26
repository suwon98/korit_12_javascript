const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. 초기 데이터 로드
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 2. 화면에 리스트를 그리는 함수
function renderTodos() {
    todoList.innerHTML = ''; // 기존 리스트 비우기
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) li.classList.add('todo-item--completed');

        li.innerHTML = `
            <input type="checkbox" class="todo-item__checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-item__text">${todo.text}</span>
            <button class="todo-item__delete-btn">&times;</button>
        `;

        // 체크박스 이벤트
        const checkbox = li.querySelector('.todo-item__checkbox');
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos(); // 상태 변경 후 다시 그리기
        });

        // 삭제 버튼 이벤트
        const deleteBtn = li.querySelector('.todo-item__delete-btn');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos(); // 삭제 후 다시 그리기
        });

        todoList.appendChild(li);
    });
}

// 3. 로컬 스토리지 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 4. 할 일 추가 (입력 즉시 화면 반영)
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        alert('할 일을 입력해주세요!');
        return;
    }

    const newTodo = {
        text: todoText,
        completed: false
    };

    todos.push(newTodo); // 배열에 추가
    saveTodos();         // 저장
    renderTodos();       // 즉시 화면 갱신
    todoInput.value = ''; // 입력창 비우기
    todoInput.focus();
}

// 이벤트 연결
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

// 초기 실행
renderTodos();