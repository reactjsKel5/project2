import React, { Component } from "react";
import DashboardSchedule from "../../components/dashboard/dashboardSchedule";
import DashboardTask from "../../components/dashboard/dashboardTask";
import DashboardTodolist from "../../components/dashboard/dashboardTodolist";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
// import Todolist from "../todolist/todolist";
import './dashboard.css';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, doc, getDocs, deleteDoc, setDoc, query, where } from 'firebase/firestore';
import moment from "moment";
import 'moment/locale/id';
import 'moment/min/moment-with-locales';

class Dashboard extends Component {

    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.day = moment().format('dddd');
        this.state = {
            allDataTodolist: [],
            allDataTodolistDone: 0,
            allDataTask: [],
            allDataSchedule: [],
            allDataProfile: [],
            // "todos": '',
            // "status": '',
        };
    }

    fetchTodos = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "todolist", auth.currentUser.uid, "items"));
            querySnapshot.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
            });            
            console.log(list);
            this.setState({
                allDataTodolist: list
            })
            this.state.allDataTodolist = list;
            console.log(this.state.allDataTodolist)
        } catch (e) {
            console.log(e);
        }
    }

    fetchTodosDone = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(query(collection(db, "todolist", auth.currentUser.uid, "items"), where("status", "==", "true")));
            querySnapshot.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
            });            
            console.log(querySnapshot.docs.length);
            this.setState({
                allDataTodolistDone: list.length
            })
            this.state.allDataTodolistDone = list.length;
            console.log(this.state.allDataTodolistDone)
        } catch (e) {
            console.log(e);
        }
    }


    fetchTask = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "task", auth.currentUser.uid, "items"));
            querySnapshot.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
            });            
            console.log(list);
            this.setState({
                allDataTask: list
            })
            this.state.allDataTask = list;
            console.log(this.state.allDataTask)
        } catch (e) {
            console.log(e);
        }
    }

    fetchSchedule = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(query(collection(db, "schedule", auth.currentUser.uid, "items"), where("day", "==", this.day)));
            querySnapshot.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
            });            
            console.log(list);
            this.setState({
                allDataSchedule: list
            })
            this.state.allDataSchedule = list;
            console.log(this.state.allDataSchedule)
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

    componentDidMount(){
        
        this.fetchTodos();
        this.fetchTodosDone();
        this.fetchTask();
        this.fetchSchedule();
        this.fetchDataProfile();
        console.log(this.data);
    }

    handleStatus = async (id, todos, status) => {

        let updateStatus = (!status).toString();
        
        const res = await setDoc(doc(db, "todolist", auth.currentUser.uid, "items", id), {
            "todos": todos,
            "status": updateStatus
        })
        .then(this.fetchData)

        console.log(res);
        console.log(updateStatus);
    }

    changeStatus = async (id, task_category, task, date, status) => {
        let updateStatus = (!status).toString();
        
        const res = await setDoc(doc(db, "task", auth.currentUser.uid, "items", id), {
            "task_category": task_category,
            "task": task,
            "date": date,
            "status": updateStatus
        })
        .then(this.fetchData)

        console.log(res);
        console.log(updateStatus);
    }


    // state = {
    //     schedule: [],
    //     task: [],
    //     todolist: []
    // }
    // fetchSchedule = () => {
    //     fetch('http://localhost:3001/schedule?_sort=id_note8&_order=desc')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 schedule: json
    //             })
    //         })
    // }
    // fetchTask = () => {
    //     fetch('http://localhost:3001/task?_sort=id_note8&_order=desc')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 task: json
    //             })
    //         })
    // }
    // fetchTodolist = () => {
    //     fetch('http://localhost:3001/todolist?_sort=id_note8&_order=desc')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 todolist: json
    //             })
    //         })
    // }
    // componentDidMount() {
    //     this.fetchSchedule()
    //     this.fetchTask()
    //     this.fetchTodolist()
    // }


    render() {
        // Calculate presentase
        var dataTodolistDone = this.state.allDataTodolistDone;
        var dataTodolist = this.state.allDataTodolist.length;
        var presentaseTodolistDone = (dataTodolistDone / dataTodolist) * 100;

        var listofDataTodolist = this.state.allDataTodolist.map((val, i) => {
            var todos = val.todos
            var status = (val.status === 'true')
            var id = val.id
            return(
                <div className="row todolist-item mb-3">
                    <div className="col-auto">
                        <div key={{ i }} className="form-check">
                            <input className="form-check-input" type="checkbox" value="status" id="status" 
                            checked = {status}
                            onChange = {
                            () => {
                                this.handleStatus(id, todos, status)
                            }
                            }
                            />
                        </div>
                    </div>
                    <div className="col align-self-center">
                        <label htmlFor="checkbox-todolist1">{todos}</label>
                    </div>
                </div>
            )})

                var listofDataTask = this.state.allDataTask.map((val, i) => {
                    var date = val.date
                    var status = (val.status === 'true')
                    var task = val.task
                    var task_category = val.task_category
                    var id = val.id

                    return (
                        <div className="row task px-3 mb-3">
                            <div className="col-auto">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="status" id="checkbox1" 
                                    checked= {status}
                                    onChange = {
                                        () => {
                                            this.changeStatus(id, task_category, task, date, status)
                                        }
                                    }/>
                                    </div>
                                    </div>
                                    <div className="col task-item">
                                        <label for="checkbox1">{task_category}</label>
                                        <div className="row">
                                            <div className="col">
                                                <p>{task}</p>
                                                </div>
                                                <div className="col-auto">
                                                    <p>{date}</p>
                                                    </div>
                                        </div>
                                    </div>
                            </div>
                                        )
                                    })

                var listofDataSchedule = this.state.allDataSchedule.map((val, i) => {
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
                <div className="main">
                    {listofDataProfile}
                    {/* <Topbar /> */}

                    {/* Tulis content di bawah sini */}

                    <div className="dashboard m-5">
                        <h2 className="my-4">Dashboard.</h2>
                        <div className="row">
                            <div className="col-md-7 col-sm">
                                <div className="schedule card">
                                    <div className="card-body m-4">
                                        <h3>Today's Schedule</h3>                                        
                                        <div className="row mt-5 title">
                                            <div className="col-md-4 col-sm time">
                                                <h4>Waktu</h4>
                                            </div>
                                            <div className="col-md-8 col-sm matkul">
                                                <h4>Mata Kuliah</h4>
                                            </div>
                                        </div>
                                        {listofDataSchedule}
                                       
                                        {/* {
                                            this.state.schedule.map(data => {
                                                return <DashboardSchedule key={data.id} waktu_mulai={data.waktu_mulai} waktu_berakhir={data.waktu_berakhir} nama_schedule={data.nama_schedule} />
                                            })
                                        } */}
                                        <Link to="/CollegeManagement/Schedule">
                                            <button href="#" className="arrow float-end"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="task card mt-3">
                                    <div className="card-body m-4">
                                        <h3 className="mb-5">Your Tasks</h3>
                                        {listofDataTask}
                                        {/* {
                                            this.state.task.map(data => {
                                                return <DashboardTask key={data.id} detail_task={data.detail_task} tgl_ddline={data.tgl_ddline} />
                                            })
                                        } */}
                                        <Link to="/CollegeManagement/Task">
                                            <button href="#" className="arrow float-end"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm">
                                <div className="card todolist">
                                    <div className="card-body mx-4 my-4">
                                        <p>Progress</p>
                                        <div className="text-center my-5 mx-auto" style={{ width: 250, height: 250 }}>
                                            <CircularProgressbarWithChildren
                                                value={Math.round(presentaseTodolistDone)}
                                                className="text-center"
                                                styles={buildStyles({
                                                    pathColor: '#FB4F4F'
                                                })}
                                            >
                                                <div style={{ fontSize: 52 }}>
                                                    <strong>{Math.round(presentaseTodolistDone)}%</strong>
                                                </div>
                                                <p style={{ color: '#887F96', marginBottom: -5, marginTop: -10 }}>Selesai</p>
                                            </CircularProgressbarWithChildren>;
                                        </div>
                                        <p className="mb-4">Todolist</p>
                                        {listofDataTodolist}
                                        <Link to="/CollegeManagement/Todolist">
                                            <button className="btn btn-danger d-inline-block mt-4" onClick={this.insertIncome}>+</button>
                                        </Link>
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

export default Dashboard;