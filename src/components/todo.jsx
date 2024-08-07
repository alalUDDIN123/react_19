import { useState, useEffect } from "react";
import "../styles/todo.css";
import TodoList from "./TodoList";
import DateTime from "./DateTime";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils/Helper";

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
        setTodos((prev) => [...prev, { text: todoInput, completed: false, isEditing: false }]);
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
                            placeholder="Add Todo..."
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

            {todos.length < 1 ? (
                <div className="no-tasks-message">
                    Hurry! You have no tasks. Enjoy your free time! 😄
                </div>
            ) : (
                <TodoList todos={todos} setTodos={setTodos} />
            )}


        </section>
    );
};

export default Todo;
