export const getTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('todos'));
};

export const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
