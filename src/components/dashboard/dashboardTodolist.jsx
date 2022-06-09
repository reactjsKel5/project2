import React from "react";

function DashboardTodolist(props) {
    return (
        <div className="row todolist-item mb-3">
            <div className="col-auto">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="status" id="checkbox-todolist1" />
                </div>
            </div>
            <div className="col align-self-center">
                <label htmlFor="checkbox-todolist1">{props.nama_todo}</label>
            </div>
        </div>
    );
}

export default DashboardTodolist;