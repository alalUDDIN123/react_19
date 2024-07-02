
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
