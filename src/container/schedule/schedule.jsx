import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import ScheduleProps from "../../components/scheduleprops";
import './schedule.css';
// import { addDoc, collection } from "firebase/firestore";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

class Schedule extends Component {


    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.day = "Selasa"
        this.state = {
            allData: [],
            allDataProfile: [],
            // 'day': '',
            // "timeend": '',
            // "timestart": '',
            // "topic": '',
        };
    }
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "schedule", auth.currentUser.uid, this.day));
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            console.log(list);
            this.setState({
                allData: list
            })
            this.state.allData = list;
            console.log(this.state.allData)
        } catch (e) {
            console.log(e);
        }
    }

    fetchDataProfile = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "profile", auth.currentUser.uid, "items"));
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            console.log(list);
            this.setState({
                allDataProfile: list
            })
            this.state.allDataProfile = list;
            console.log(this.state.allDataProfile)
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {

        this.fetchData();
        this.fetchDataProfile();
        console.log(this.data);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { day, timeend, timestart, topic } = this.state;
        const res = await addDoc(collection(db, "schedule", auth.currentUser.uid, day), {
            "day": day,
            "timeend": timeend,
            "timestart": timestart,
            "topic": topic
        })
        .then(
            this.fetchData()
        )
            .then((docRef) => {
                this.setState({
                    day: "",
                    timeend: "",
                    timestart: "",
                    topic: ""
                })
            })
        console.log(res);
    }
    
    onChangeSelect = (day) => {
        this.day = day;
        console.log(this.day);
    }

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

        var listofData = this.state.allData.map((val, i) => {
            var day = val.day
            var timeend = val.timeend
            var timestart = val.timestart
            var topic = val.topic
            return (
                <div class="row text-secondary mb-1">
                    <div class="col-4">
                        <p>{timestart} - {timeend}</p>
                    </div>
                    <div class="col-6">
                        <p>{topic}</p>
                    </div>
                    <div class="col-2">
                        <button className="btn-delete float-end">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            )
        })

        var listofDataProfile = this.state.allDataProfile.map((val, i) => {
            var nama = val.nama
        return (
            <div className="topbar">
            <div className="toggle">
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div className="user-information row">
                <div className="col name align-self-center">
                    <h6>{nama}</h6>
                </div>
                <div className="col user">
                    <img src="https://images.unsplash.com/photo-1638204957796-4ad60705aa17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" width="200" alt="user-photo" />
                </div>
            </div>
        </div>
        )
    })

        return (
            <div>
                <Sidebar />
                {/* Tulis content di bawah sini */}
                <div className="main">
                    {listofDataProfile}
                    {/* <Topbar /> */}
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
                                                    <label for="dey" class="text-secondary">Hari</label>
                                                    <select id="day" name="day" class="form-select" onChange={this.onChange} value={this.state[this.day]}>
                                                        <option>...</option>
                                                        <option value="Senin">Senin</option>
                                                        <option value="Selasa">Selasa</option>
                                                        <option value="Rabu">Rabu</option>
                                                        <option value="Kamis">Kamis</option>
                                                        <option value="Jumat">Jumat</option>
                                                        <option value="Sabtu">Sabtu</option>
                                                        <option value="Minggu">Minggu</option>
                                                    </select>
                                                </div>
                                                <div class="mb-4">
                                                    <label for="namaJadwal" class="text-secondary">Nama Jadwal</label>
                                                    <input type="text" class="form-control" name="topic" id="topic" placeholder="..." onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="mb-4">
                                                    <label for="waktuMulai" class="text-secondary">Waktu Mulai</label>
                                                    <input type="time" class="form-control" name="timestart" id="timeend" onChange={this.onChange} />
                                                </div>
                                                <div class="mb-4">
                                                    <label for="waktuBerakhir" class="text-secondary">Waktu Berakhir</label>
                                                    <input type="time" class="form-control" name="timeend" id="timeend" onChange={this.onChange} />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 text-end" >
                                                        <button className="btn-tambah" onClick={this.onSubmit}>Tambah</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="section-nav-hari">
                            {/* <nav class="nav nav-day my-5">
                                <a class="nav-link active" aria-current="page"  onClick={this.onChangeSelect('Senin')}>Senin</a>
                                <a class="nav-link" onClick={this.onChangeSelect('Selasa')}>Selasa</a>
                                <a class="nav-link" href="#" onClick={this.onChangeSelect('Rabu')}>Rabu</a>
                                <a class="nav-link" href="#" onClick={this.onChangeSelect('Kamis')}>Kamis</a>
                                <a class="nav-link" href="#"onClick={this.onChangeSelect('Jumat')}>Jumat</a>
                                <a class="nav-link" href="#" onClick={this.onChangeSelect('Sabtu')}>Sabtu</a>
                                <a class="nav-link" href="#" onClick={this.onChangeSelect('Minggu')}>Minggu</a>
                            </nav> */}
                        </div>
                        <div className="col-sm">
                            <div className="card-schedule">
                                <div className="card-body my-4 mx-3">
                                    <div class="card-body text-light">
                                        <div class="judul row title-schedule mb-5">
                                            <div class="col-4">Waktu</div>
                                            <div class="col-6">Jadwal</div>
                                            <div className="row">
                                            <div class="col">
                                               <p>
                                               {listofData}
                                               </p>
                                            </div>
                                            </div>
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