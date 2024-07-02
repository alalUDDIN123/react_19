# Todo Application

## Overview
This is a simple Todo application built using React. The application allows users to add, edit, delete, and mark tasks as completed. The current date and time are displayed at the top of the application, and the todos are saved in local storage to persist across sessions.

## Folder Structure

```
src/
├── components/
│   ├── DateTime.js
│   ├── Todo.js
│   ├── TodoItem.js
│   └── TodoList.js
├── utils/
│   ├── Helper.js
├── styles/
│   └── todo.css
├── App.js
└── index.js
```

### Components
- **DateTime.js**: Displays the current date and time.
- **Todo.js**: Main component that holds the state for the todo list and renders the input form and todo list.
- **TodoItem.js**: Represents a single todo item.
- **TodoList.js**: Renders a list of todo items.

### Utils
- **Helper.js**: Contains helper functions for interacting with local storage.

### Styles
- **todo.css**: Contains CSS styles for the application.

## Flow and Functionalities

### 1. App Initialization

**index.js**
- Renders the `App` component into the DOM.

**App.js**
- Imports and renders the `Todo` component.

### 2. Main Todo Component

**Todo.js**
- Manages the state for `todoInput` and `todos`.
- Uses `useEffect` to load todos from local storage on initial render and save todos to local storage when the todos state changes.
- Contains the form for adding new todos and renders the `TodoList` component.
- The "Clear All" button clears all todos.

#### Code:

```jsx
import { useState, useEffect } from "react";
import "./styles/todo.css";
import TodoList from "./components/TodoList";
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from "./utils/Helper";
import DateTime from "./components/DateTime";

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
                        <button className="clear-btn" onClick={() => setTodos([])}>Clear All</button>
                    </div>
                </form>
            </section>
            <TodoList todos={todos} setTodos={setTodos} />
        </section>
    );
};

export default Todo;
```

### 3. Display Date and Time

**DateTime.js**
- Uses `useState` and `useEffect` to update the current date and time every second.

#### Code:

```jsx
import { useEffect, useState } from "react"

const DateTime = () => {
    const [dateTime, setdataTime] = useState(null)

    useEffect(() => {
        const clearIntervalId = setInterval(() => {
            const currentdata = new Date();
            const formatteddate = currentdata.toLocaleDateString()
            const formattedTime = currentdata.toLocaleTimeString()
            setdataTime(`${formatteddate} - ${formattedTime}`)
        }, 1000)

        return () => {
            clearInterval(clearIntervalId)
        }
    }, [])
    return (
        <>
          {dateTime}
        </>
    )
}

export default DateTime
```

### 4. Todo List Component

**TodoList.js**
- Renders the list of todos using the `TodoItem` component.
- Provides functions to handle checking, deleting, and editing todos.

#### Code:

```jsx
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }) => {
    const handleCheck = (index) => {
        setTodos((prev) =>
            prev.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (index) => {
        setTodos((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (index, newText) => {
        setTodos((prev) =>
            prev.map((todo, i) =>
                i === index ? { ...todo, text: newText } : todo
            )
        );
    };

    return (
        <section className="todo-list-container">
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        index={index}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ))}
            </ul>
        </section>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        })
    ).isRequired,
    setTodos: PropTypes.func.isRequired
};

export default TodoList;
```

### 5. Todo Item Component

**TodoItem.js**
- Represents a single todo item.
- Allows users to check/uncheck, edit, and delete the todo.
- Uses icons for the actions.

#### Code:

```jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { MdCheck, MdDeleteForever, MdEdit, MdSave, MdClose } from "react-icons/md";

const TodoItem = ({ todo, index, handleCheck, handleDelete, handleEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEditClick = () => {
        if (isEditing) {
            handleEdit(index, editText);
        }
        setIsEditing(!isEditing);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditText(todo.text);
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <span>{todo.text}</span>
            )}
            <button onClick={() => handleCheck(index)}>
                {todo.completed ? <MdClose className="check-btn" /> : <MdCheck className="check-btn" />}
            </button>
            <button onClick={handleEditClick}>
                {isEditing ? <MdSave className="edit-btn" /> : <MdEdit className="edit-btn" />}
            </button>
            {isEditing && (
                <button onClick={handleCancelClick}>
                    <MdClose className="cancel-btn" />
                </button>
            )}
            <button onClick={() => handleDelete(index)}>
                <MdDeleteForever className="delete-btn" />
            </button>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleCheck: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
};

export default TodoItem;
```

### 6. Helper Functions

**Helper.js**
- Contains functions to get and save todos from/to local storage.

#### Code:

```jsx
export const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
};

export const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
```

### 7. CSS Styles

**todo.css**
- Styles for the Todo application.

#### Code:

```css
/* General Styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
   

 height: 100vh;
}

.todo-container {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}

header {
    text-align: center;
    margin-bottom: 1.5rem;
}

header h1 {
    margin: 0;
    color: #333;
}

.datetime {
    margin-top: 0.5rem;
    color: #777;
}

/* Form Styles */
.form {
    margin-bottom: 1.5rem;
}

.todo-input {
    width: calc(100% - 24px);
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-btn,
.clear-btn {
    width: 48%;
    padding: 12px;
    border: none;
    color: #fff;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.todo-btn {
    background-color: #007bff;
}

.todo-btn:hover {
    background-color: #0056b3;
}

.clear-btn {
    background-color: #dc3545;
}

.clear-btn:hover {
    background-color: #c82333;
}

/* Todo List Styles */
.todo-list-container {
    margin-top: 1.5rem;
}

.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s ease;
}

.todo-item.completed span {
    text-decoration: line-through;
    color: #aaa;
}

.todo-item input[type="text"] {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 1rem;
    font-size: 1rem;
}

.todo-item button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    color: #555;
    transition: color 0.3s ease;
}

.todo-item button:hover {
    color: #000;
}

.check-btn {
    color: #28a745;
}

.check-btn:hover {
    color: #218838;
}

.edit-btn {
    color: #ffc107;
}

.edit-btn:hover {
    color: #e0a800;
}

.cancel-btn {
    color: #dc3545;
}

.cancel-btn:hover {
    color: #c82333;
}

.delete-btn {
    color: #dc3545;
}

.delete-btn:hover {
    color: #c82333;
}
```

This documentation provides a comprehensive overview of the Todo application, including the folder structure, code for each component, and the CSS styles used.