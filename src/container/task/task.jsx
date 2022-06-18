import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
// import Task from "../../component/menubar/taskdel";
import Topbar from "../../components/menubar/topbar";
// import Taskk from "../../components/task";
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import "./task.css";

class Task extends Component {

    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.data = [];
        this.state = {
            allData: [],
            allDataProfile: [],
            // 'date': '',
            // "status": 'true',
            // "task": '',
            // "task_category": '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "task", auth.currentUser.uid, "items"));
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
            const querySnapshot = await getDoc(doc(db, "users", this.user))
            .then((docRef) => {
                this.setState({
                    email : docRef.data()['email'],
                    nama_lengkap : docRef.data()['nama_lengkap'],
                    phone : docRef.data()['phone'],
                    prof_img : docRef.data()['prof_img'],
                })
                console.log(this.state)
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleDelete = async (id) => {
        deleteDoc(doc(db, "task", auth.currentUser.uid, "items", id))
            .then(
                this.fetchData()
            )
    }

    componentDidMount() {

        this.fetchData();
        this.fetchDataProfile();
        console.log(this.data);
    }

    onChange = (e) => {
        const state = this.state
        // const current = new Date();
        // const date = `${current.getDay()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        state[e.target.name] = e.target.value;
        state['status'] = 'false';
        // state['date'] = date;
        this.setState(state);
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { date, status, task, task_category } = this.state;
        const res = await addDoc(collection(db, "task", auth.currentUser.uid, "items"), {
            "date": date,
            "status": status,
            "task": task,
            "task_category": task_category
        })
            .then(
                this.fetchData()
            )
            .then((docRef) => {
                this.setState({
                    date: "",
                    status: "",
                    task: "",
                    task_category: ""
                })
            })
        console.log(res);
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
    //     task: [],
    //     insertTaskk: {
    //         id: 1,
    //         uid: 1,
    //         jenis: "",
    //         tgl_ddline: "",
    //         detail_task: ""
    //     }
    // }

    // fetchTask = () => {
    //     fetch('http://localhost:3001/task?_sort=id_task8&_order=desc')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 task: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.fetchTask()
    // }

    // deleteTask = (id_task) => {
    //     fetch(`http://localhost:3001/task/${id_task}`, {
    //         method: 'DELETE'
    //     })
    //         .then(json => {
    //             this.fetchTask()
    //         })
    // }

    // handleChangeInsert = (event) => {
    //     let insertTaskData = { ...this.state.insertTaskk };
    //     let timestamp = new Date().getTime();
    //     insertTaskData['id'] = timestamp;
    //     insertTaskData[event.target.name] = event.target.value;
    //     this.setState({
    //         insertTaskk: insertTaskData
    //     });
    // }

    // insertTask = (event) => {
    //     event.preventDefault();
    //     fetch('http://localhost:3001/task', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.insertTaskk)
    //     })
    //         .then(response => response.json())
    //         .then(json => this.fetchTask())
    // }

    render() {
        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;

        var listofData = this.state.allData.map((val, i) => {
            var date = val.date
            var status = (val.status === 'true')
            var task = val.task
            var task_category = val.task_category
            var id = val.id
            return (
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="status" id="status"
                    checked= {status}
                    onChange = {
                        () => {
                            this.changeStatus(id, task_category, task, date, status)
                        }
                    } />
                    <label className="form-check-label ms-3" for="task1">
                        <h6 className="card-title float-none"><b>{task_category}</b></h6>
                        <h6>{task}</h6>
                        <p>{date}</p>
                    </label>
                    <button className="btn-delete-task float-end">
                        <ion-icon name="trash-outline" onClick={() => {
                            this.handleDelete(id)
                        }}></ion-icon>
                    </button>
                </div>
            )
        })

        return (
            <div>
                <Sidebar />
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

                    <div className="m-md-5 col-sm task">
                        <h2 className="mb-4">Task.</h2>
                        <div className="card-main">
                            <div className="card-body">
                                <form action="submit" className="m-2 row">
                                    <div className="col">
                                        <input type="text" className="form-control px-4" name="nama_task" id="nama_task" placeholder="Ketikkan disini ..." />
                                    </div>
                                    <div className="col-md-auto col-sm align-self-center">
                                        <button className="btn btn-danger d-inline-block" >Cari</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-7 col-sm mb-2">
                                <div className="card-min">
                                    <div className="card-body my-4 mx-3">
                                        <form action="submit" className="m-2">
                                            <select class="form-select text-secondary my-3 px-4" name="task_category" id="task_category" onChange={this.onChange}>
                                                <option value="0">--</option>
                                                <option value="Quiz">Quiz</option>
                                                <option value="Assignment">Assignment</option>
                                            </select>
                                            <input type="date" className="form-control px-4" name="date" id="date" onChange={this.onChange} />

                                            <textarea type="text" className="form-control px-4 my-3" placeholder="Detail" name="task" id="task" onChange={this.onChange} />

                                            <button className="btn btn-primary d-inline-block" onClick={this.onSubmit}>Tambah</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm mb-2">
                                <div className="card-max">
                                    <div className="card-body px-4">
                                        {listofData}
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

export default Task;