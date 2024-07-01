import { useState, useEffect } from "react";
import "./todo.css";
import TodoList from "./TodoList";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "./Helper";

const Todo = () => {
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = getTodosFromLocalStorage();
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        saveTodosToLocalStorage(todos);
    }, [todos]);

    const handleChange = (value) => {
        setTodoInput(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!todoInput) return;
        setTodos((prev) => [...prev, { text: todoInput, completed: false }]);
        setTodoInput('');
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
            </header>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            onChange={(e) => handleChange(e.target.value)}
                            value={todoInput}
                        />
                    </div>
                    <div>
                        <button className="todo-btn" type="submit">Add Task</button>
                    </div>
                </form>
            </section>
            <TodoList todos={todos} setTodos={setTodos} />
        </section>
    );
};

export default Todo;
