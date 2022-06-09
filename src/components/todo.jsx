import React from "react";

function Todo(props) {
    return (
        <div className="form-check mx-3 mb-4">
            <input className="form-check-input" type="checkbox" value="status" id="status" />
            <label className="form-check-label ms-3" for="todolist1">
                {props.todo}
            </label>
            <button className="btn-delete float-end" onClick={
                () => {
                    props.delete(props.id)
                }
            }>
                <ion-icon name="trash-outline"></ion-icon>
            </button>
        </div>
    );
}

export default Todo;