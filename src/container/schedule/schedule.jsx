import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import ScheduleProps from "../../components/scheduleprops";
import './schedule.css';
// import { addDoc, collection } from "firebase/firestore";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where, getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import moment from "moment";
import 'moment/locale/en-au';
import 'moment/min/moment-with-locales';
import swal from 'sweetalert';
import { Warning } from "postcss";

class Schedule extends Component {


    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.userUid = localStorage.getItem("userUid");
        this.day = moment().format('dddd');
        this.state = {
            isModal: false,
            isActive: {
                "Sunday": false,
                "Monday": false,
                "Tuesday": false,
                "Wednesday": false,
                "Thursday": false,
                "Friday": false,
                "Saturday": false
            },
            allData: [],
            allDataProfile: [],
            'day': '',
            "timeend": '',
            "timestart": '',
            "topic": '',
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
            const querySnapshot = await getDocs(query(collection(db, "schedule", this.userUid, "items"), where("day", "==", this.day)));
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
            const querySnapshot = await getDoc(doc(db, "users", this.userUid))
                .then((docRef) => {
                    this.setState({
                        email: docRef.data()['email'],
                        nama_lengkap: docRef.data()['nama_lengkap'],
                        phone: docRef.data()['phone'],
                        prof_img: docRef.data()['prof_img'],
                    })
                    console.log(this.state)
                })
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {

        this.fetchData();
        this.fetchDataProfile();
        console.log(this.data);
        console.log(this.day);
        this.state.isActive[this.day] = true;
    }

    handleDelete = async (id) => {
        deleteDoc(doc(db, "schedule", this.userUid, "items", id))
            .then(
                this.fetchData()
            )
    }

    onSubmit = async (e) => {
        
        e.preventDefault();
        const { day, timeend, timestart, topic } = this.state;    
        if (this.state["day"], this.state["timestart"], this.state["timeend"], this.state["topic"] == "") {
            swal({
                title: 'Invalid Input!',
                text: 'Please fill the form.',
                icon: 'warning',
                dangerMode: true
            });
        } else {
            const res = await addDoc(collection(db, "schedule", this.userUid, "items"), {
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
    }

    onChangeSelect = (event, day, sunday, monday, tuesday, wednesday, thursday, friday, saturday) => {
        event.preventDefault();

        this.state.isActive["Sunday"] = sunday;
        this.state.isActive["Monday"] = monday;
        this.state.isActive["Tuesday"] = tuesday;
        this.state.isActive["Wednesday"] = wednesday;
        this.state.isActive["Thursday"] = thursday;
        this.state.isActive["Friday"] = friday;
        this.state.isActive["Saturday"] = saturday;

        this.day = day;
        console.log(this.day);
        this.fetchData();
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

        const { day, timeend, timestart, topic } = this.state;
        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;

        var listofData = this.state.allData.map((val, i) => {
            var day = val.day
            var timeend = val.timeend
            var timestart = val.timestart
            var topic = val.topic
            var id = val.id
            return (
                <div key={i} class="row text-secondary mb-1">
                    <div class="col-4">
                        <p>{timestart} - {timeend}</p>
                    </div>
                    <div class="col-6">
                        <p>{topic}</p>
                    </div>
                    <div class="col-2">
                        <button className="btn-delete float-end"
                            onClick={
                                () => {
                                    this.handleDelete(id)
                                }
                            }
                        >
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            )
        })


        return (
            <div>
                <Sidebar />
                {/* Tulis content di bawah sini */}
                <div className="main">
                    <div className="topbar">
                        <div className="toggle">
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>
                        <div className="user-information row">
                            <div className="col name align-self-center">
                                <h6>{nama_lengkap}</h6>
                            </div>
                            <div className="col user">
                                <img src={prof_img} width="200" alt="user-photo" />
                            </div>
                        </div>
                    </div>
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
                                                    <label for="dey" class="text-secondary">Day</label>
                                                    <select id="day" name="day" class="form-select" onChange={this.onChange} value={day}>
                                                        <option>...</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                        <option value="Sunday">Sunday</option>
                                                    </select>
                                                </div>
                                                <div class="mb-4">
                                                    <label for="namaJadwal" class="text-secondary">Topic</label>
                                                    <input type="text" class="form-control" name="topic" id="topic" placeholder="..." onChange={this.onChange} value={topic} />
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="mb-4">
                                                    <label for="waktuMulai" class="text-secondary">Time Start</label>
                                                    <input type="time" class="form-control" name="timestart" id="timeend" onChange={this.onChange} value={timestart} />
                                                </div>
                                                <div class="mb-4">
                                                    <label for="waktuBerakhir" class="text-secondary">Time End</label>
                                                    <input type="time" class="form-control" name="timeend" id="timeend" onChange={this.onChange} value={timeend} />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 text-end" >
                                                        <button className="btn-tambah" onClick={this.onSubmit}>Add New</button>
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
                                <a class={this.state.isActive["Monday"] ? "nav-link active" : "nav-link"} aria-current="page" href="#" onClick={(event) => { this.onChangeSelect(event, "Monday", false, true, false, false, false, false, false) }}>Senin</a>
                                <a class={this.state.isActive["Tuesday"] ? "nav-link active" : "nav-link"} href="#" onClick={(event) => { this.onChangeSelect(event, "Tuesday", false, false, true, false, false, false, false) }}>Selasa</a>
                                <a class={this.state.isActive["Wednesday"] ? "nav-link active" : "nav-link"} href="#" onClick={(event) => { this.onChangeSelect(event, "Wednesday", false, false, false, true, false, false, false) }}>Rabu</a>
                                <a class={this.state.isActive["Thursday"] ? "nav-link active" : "nav-link"} href="#" onClick={(event) => { this.onChangeSelect(event, "Thursday", false, false, false, false, true, false, false) }}>Kamis</a>
                                <a class={this.state.isActive["Friday"] ? "nav-link active" : "nav-link"} href="#" onClick={(event) => { this.onChangeSelect(event, "Friday", false, false, false, false, false, true, false) }}>Jumat</a>
                                <a class={this.state.isActive["Saturday"] ? "nav-link active" : "nav-link"} href="#" onClick={(event) => { this.onChangeSelect(event, "Saturday", false, false, false, false, false, false, true) }}>Sabtu</a>
                                <a class={this.state.isActive["Sunday"] ? "nav-link active" : "nav-link"} href="#" onClick={(event) => { this.onChangeSelect(event, "Sunday", true, false, false, false, false, false, false) }}>Minggu</a>
                            </nav>
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