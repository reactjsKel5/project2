import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import ScheduleProps from "../../components/scheduleprops";
import './schedule.css';
import { addDoc, collection } from "firebase/firestore"; 

class Schedule extends Component {

    // state = {
    //     schedule: [],
    //     insertSchedule : {
    //         uid: 2,
    //         id: 1,
    //         waktu_mulai : 0,
    //         waktu_berakhir: 0,
    //         nama_schedule: ""
    //     }
    // }

    // //get Schedule
    // fetchSchedule = () => {
    //     fetch('http://localhost:3001/schedule')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 schedule: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.fetchSchedule()
    // }

    // deleteSchedule = (id) => {
    //     fetch(`http://localhost:3001/schedule/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(json => {
    //             this.fetchSchedule()
    //         })
    // }

    // // deleteSchedule = () => {
    // //     fetch(`http://localhost:3001/schedule`, {
    // //         method: 'DELETE'
    // //     })
    // //         .then(json => {
    // //             this.fetchSchedule()
    // //         })
    // // }

    // handleChangeInsert = (event) => {
    //     let insertScheduleData = {...this.state.insertSchedule}
    //     let timestamp = new Date().getTime()
    //     insertScheduleData['id'] = timestamp
    //     insertScheduleData[event.target.name] = event.target.value
    //     this.setState({
    //         insertSchedule: insertScheduleData
    //     })
    // }

    // addSchedule = (event) => {
    //     event.preventDefault()
    //     fetch('http://localhost:3001/schedule', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.insertSchedule)
    //     })
    //         .then(response => response.json())
    //         .then(json => this.fetchSchedule())
    // }

    render() {
        return (


            <div>
                <Sidebar />
                {/* Tulis content di bawah sini */}
                <div className="main">
                    <Topbar />
                    <div className="m-md-5 schedule">
                        <div className="schedule-txt">Schedule.</div>
                        <div className="col-sm">
                            <div className="card-schedule mb-3">
                                <div className="card-body my-4 mx-3">
                                    <form action="" className="form-input">
                                        <h3 className="mb-3">Input : </h3>
                                        <div className="row">
                                            <div class="col-md">
                                                <div class="mb-4">
                                                    <label for="day" class="text-secondary">Hari</label>
                                                    <select id="inputHari" class="form-select">
                                                        <option>Senin</option>
                                                        <option>Selasa</option>
                                                        <option>Rabu</option>
                                                        <option>Kamis</option>
                                                        <option>Jumat</option>
                                                        <option>Sabtu</option>
                                                        <option>Minggu</option>
                                                    </select>
                                                </div>
                                                <div class="mb-4">
                                                    <label for="namaJadwal" class="text-secondary">Nama Jadwal</label>
                                                    <input type="text" class="form-control" name="nama_schedule" id="nama_schedule" placeholder="..."  />
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="mb-4">
                                                    <label for="waktuMulai" class="text-secondary">Waktu Mulai</label>
                                                    <input type="time" class="form-control" name="waktu_mulai" id="waktu_mulai"  />
                                                </div>
                                                <div class="mb-4">
                                                    <label for="waktuBerakhir" class="text-secondary">Waktu Berakhir</label>
                                                    <input type="time" class="form-control" name="waktu_berakhir" id="waktu_berakhir"/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 text-end" >
                                                        <button className="btn-tambah">Tambah</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="section-nav-hari">
                            <nav class="nav nav-day my-5">
                                <a class="nav-link active" aria-current="page" href="#">Senin</a>
                                <a class="nav-link" href="#">Selasa</a>
                                <a class="nav-link" href="#">Rabu</a>
                                <a class="nav-link" href="#">Kamis</a>
                                <a class="nav-link" href="#">Jumat</a>
                                <a class="nav-link" href="#">Sabtu</a>
                                <a class="nav-link" href="#">Minggu</a>
                            </nav>
                        </div>
                        <div className="col-sm">
                            <div className="card-schedule">
                                <div className="card-body my-4 mx-3">
                                        <div class="card-body text-light">
                                            <div class="judul row title-schedule mb-5">
                                                <div class="col-4">Waktu</div>
                                                <div class="col-6">Jadwal</div>
                                                <div class="col-2"></div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Schedule;