import { useState, useEffect } from "react";
import "./todo.css";
import TodoList from "./TodoList";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "./Helper";
import DateTime from "./DateTime";

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

    const shouldShoulClearAllBtn = todos && todos.length > 0

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                {/* display real date time */}
                <div className="datetime">
                    <DateTime />
                </div>
            </header>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-input">
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            onChange={(e) => handleChange(e.target.value)}
                            value={todoInput}
                        />
                    </div>
                    <div className="form-buttons">
                        <button className="todo-btn" type="submit">Add Task</button>

                    </div>
                </form>
            </section>
            {/* clear all todos */}
            {
                shouldShoulClearAllBtn && <button className="clear-btn" onClick={() => setTodos([])}>Clear All</button>
            }


            <TodoList todos={todos} setTodos={setTodos} />
        </section>
    );
};

export default Todo;
