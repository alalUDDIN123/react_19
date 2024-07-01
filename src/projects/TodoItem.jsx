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
