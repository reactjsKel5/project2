import React from "react";

function Taskk(props) {
    return (
        <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" value="status" id="status" />
            <label className="form-check-label ms-3" for="task1">
                <h6 className="card-title float-none"><b>{props.jenis}</b></h6>
                <h6>{props.detail_task}</h6>
                <p>{props.tgl_ddline}</p>
            </label>
            <button className="btn-delete-task float-end" onClick={
                () => {
                    props.delete(props.id)
                }
            }>
                <ion-icon name="trash-outline"></ion-icon>
            </button>
        </div>
    );
}

export default Taskk;
