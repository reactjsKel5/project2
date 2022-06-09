import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
// import Task from "../../component/menubar/taskdel";
import Topbar from "../../components/menubar/topbar";
import Taskk from "../../component/task";
import "./task.css";

class Task extends Component {
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
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

                    <div className="m-md-5 col-sm task">
                        <h2 className="mb-4">Task.</h2>
                        <div className="card-main">
                            <div className="card-body">
                                <form action="submit" className="m-2 row">
                                    <div className="col">
                                        <input type="text" className="form-control px-4" name="nama_task" id="nama_task" placeholder="Ketikkan disini ..." onChange={this.handleChangeInsert} />
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
                                            <select class="form-select text-secondary my-3 px-4" name="jenis" id="jenis" onChange={this.handleChangeInsert}>
                                                <option value="0">--</option>
                                                <option value="Quiz">Quiz</option>
                                                <option value="Assignment">Assignment</option>
                                            </select>
                                            <input type="date" className="form-control px-4" name="tgl_ddline" id="tgl_ddline" onChange={this.handleChangeInsert} />

                                            <textarea type="text" className="form-control px-4 my-3" placeholder="Detail" name="detail_task" id="detail_task" onChange={this.handleChangeInsert} />

                                            <button className="btn btn-primary d-inline-block" onClick={this.insertTask}>Tambah</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm mb-2">
                                <div className="card-max">
                                    <div className="card-body px-4">
                                        {
                                            this.state.task.map(taskk => {
                                                return <Taskk key={taskk.id} uid={taskk.uid} jenis={taskk.jenis} tgl_ddline={taskk.tgl_ddline} detail_task={taskk.detail_task} id={taskk.id} delete={this.deleteTask} />
                                            })
                                        }
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