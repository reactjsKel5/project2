import React from "react";

function DashboardSchedule(props) {
    return (
        <div className="row schedule-item">
            <div className="col-md-4 col-sm">
                <p>{props.waktu_mulai} - {props.waktu_berakhir}</p>
            </div>
            <div className="col-md-8 col-sm">
                <p>{props.nama_schedule}</p>
            </div>
        </div>
    );
}

export default DashboardSchedule;