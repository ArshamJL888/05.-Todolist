import React from 'react'

export default function Todo(props) {
    
    function removeTodoHandler(id) {
        props.onRemove(id);
    }
    const editTodoHandler = (id) => {
        props.onEdit(id);
    }
    console.log(props);

    return (
        <div className={`todo ${props.completed ? 'completed' : ''}`} style={{ display: 'flex' }}>
            <li className="todo-item">{props.title}</li>

            <button className='check-btn' onClick={() => editTodoHandler(props.id)}>
                <i className="fas fa-check" aria-hidden="true"></i>
            </button>

            <button onClick={() => removeTodoHandler(props.id)} className="trash-btn">
                <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    )
}
