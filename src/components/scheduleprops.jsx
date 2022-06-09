import React from "react";

const ScheduleProps = (props) => {
    return (
        <div class="row text-secondary mb-1">
            <div class="col-4">
                <p>{props.waktu_mulai} - {props.waktu_berakhir}</p>
            </div>
            <div class="col-6">
                <p>{props.nama}</p>
            </div>
            <div class="col-2">
                <button className="btn-delete float-end" onClick={
                    () => {
                        props.delete(props.id)
                    }
                }>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>
        </div>
    )
}



export default ScheduleProps;