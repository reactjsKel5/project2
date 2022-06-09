import React from "react";

function DashboardTask(props) {
    return (
        <div className="row task px-3 mb-3">
            <div className="col-auto">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="status" id="checkbox1" />
                </div>
            </div>
            <div className="col task-item">
                <label for="checkbox1">Assignment</label>
                <div className="row">
                    <div className="col">
                        <p>{props.detail_task}</p>
                    </div>
                    <div className="col-auto">
                        <p>{props.tgl_ddline}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardTask;