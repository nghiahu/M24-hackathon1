"use strict";
class TodoList {
    constructor(id, name, completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
}
class TodoListFuncion {
    constructor() {
        const listTodoLocal = localStorage.getItem("todoList");
        this.listTodo = listTodoLocal ? JSON.parse(listTodoLocal) : [];
    }
    saveTodo() {
        localStorage.setItem("todoList", JSON.stringify(this.listTodo));
    }
    getAllPlayer() {
        return this.listTodo;
    }
    renderJob() {
        const TodoHtmls = todoList.getAllPlayer().map((todo) => {
            return `
            <li class="todo">
            <div id="todo-${todo.id}" class="${todo.completed ? 'red-text' : ''}">${todo.name}</div>
                <div class="function">
                <input class="done" type="checkbox" onclick="todoList.updateJob(${todo.id}, this)" ${todo.completed ? 'checked' : ''}>
                    <ion-icon class="change" onclick="todoList.change(${todo.id})" name="pencil-outline"></ion-icon>
                    <ion-icon class="delTodo" onclick="todoList.deleteJob(${todo.id})" name="trash-bin-outline"></ion-icon>
                </div>
            </li>
            `;
        });
        const convertToString = TodoHtmls.join("");
        listTodoElement.innerHTML = convertToString;
    }
    createJob() {
        if (inpTodoElement.value === "") {
            alert("Tên công việc không được để trống");
        }
        else {
            let findIndex = this.listTodo.findIndex(item => item.name === inpTodoElement.value);
            if (findIndex === -1) {
                let newJob = new TodoList(Math.random() * 10000, inpTodoElement.value, false);
                this.listTodo.push(newJob);
                inpTodoElement.value = "";
                this.saveTodo();
            }
            else {
                alert("Tên công việc không được trùng nhau");
            }
        }
    }
    updateJob(id, checkbox) {
        const todo = this.listTodo.find(todo => todo.id === id);
        if (todo) {
            todo.completed = checkbox.checked;
            this.saveTodo();
            this.renderJob();
        }
        const todoElement = document.getElementById(`todo-${id}`);
        if (todoElement) {
            if (checkbox.checked) {
                todoElement.classList.add('completed');
            }
            else {
                todoElement.classList.remove('completed');
            }
        }
    }
    deleteJob(id) {
        let confirmation = confirm("Bạn có chắc chắn muốn xóa công việc này?");
        if (confirmation) {
            this.listTodo = this.listTodo.filter((todo) => todo.id !== id);
            this.saveTodo();
            this.renderJob();
        }
        else {
            return;
        }
    }
    deleteAllTask() {
        let confirmation = confirm("Bạn có chắc chắn muốn xóa tất cả công việc?");
        if (confirmation) {
            this.listTodo = [];
            this.saveTodo();
            this.renderJob();
        }
        else {
            return;
        }
    }
    deleteDoneTask() {
        let confirmation = confirm("Bạn có chắc chắn muốn xóa không?");
        if (confirmation) {
            this.listTodo = this.listTodo.filter((item) => {
                item.completed === false;
            });
            this.saveTodo();
            this.renderJob();
        }
        else {
            return;
        }
    }
    change(id) {
        this.listTodo.forEach((item) => {
            if (item.id === id) {
                item.name = inpTodoElement.value;
                this.saveTodo();
                this.renderJob();
            }
            inpTodoElement.value = "";
        });
    }
}
const listTodoElement = document.querySelector("#listTodo");
const btnAddTodolist = document.querySelector(".addTodoList");
const inpTodoElement = document.querySelector(".inp");
const delAllElemet = document.querySelector(".delAll");
const delDoneTaskElemet = document.querySelector(".delDone");
const todoList = new TodoListFuncion();
todoList.renderJob();
btnAddTodolist.addEventListener("click", () => {
    todoList.createJob();
    todoList.renderJob();
    inputElement.value = "";
});
delAllElemet.addEventListener("click", () => {
    todoList.deleteAllTask();
});
delDoneTaskElemet.addEventListener("click", () => {
    todoList.deleteDoneTask();
});
