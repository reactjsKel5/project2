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

class Dashboard extends Component {
    state = {
        schedule: [],
        task: [],
        todolist: []
    }
    fetchSchedule = () => {
        fetch('http://localhost:3001/schedule?_sort=id_note8&_order=desc')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    schedule: json
                })
            })
    }
    fetchTask = () => {
        fetch('http://localhost:3001/task?_sort=id_note8&_order=desc')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    task: json
                })
            })
    }
    fetchTodolist = () => {
        fetch('http://localhost:3001/todolist?_sort=id_note8&_order=desc')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    todolist: json
                })
            })
    }
    componentDidMount() {
        this.fetchSchedule()
        this.fetchTask()
        this.fetchTodolist()
    }


    render() {
        return (

            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

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
                                        {
                                            this.state.schedule.map(data => {
                                                return <DashboardSchedule key={data.id} waktu_mulai={data.waktu_mulai} waktu_berakhir={data.waktu_berakhir} nama_schedule={data.nama_schedule} />
                                            })
                                        }
                                        <Link to="/CollegeManagement/Schedule">
                                            <button href="#" className="arrow float-end"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="task card mt-3">
                                    <div className="card-body m-4">
                                        <h3 className="mb-5">Today's Task</h3>
                                        {
                                            this.state.task.map(data => {
                                                return <DashboardTask key={data.id} detail_task={data.detail_task} tgl_ddline={data.tgl_ddline} />
                                            })
                                        }
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
                                                value={60}
                                                className="text-center"
                                                styles={buildStyles({
                                                    pathColor: '#FB4F4F'
                                                })}
                                            >
                                                <div style={{ fontSize: 52 }}>
                                                    <strong>60%</strong>
                                                </div>
                                                <p style={{ color: '#887F96', marginBottom: -5, marginTop: -10 }}>Selesai</p>
                                            </CircularProgressbarWithChildren>;
                                        </div>
                                        <p className="mb-4">Todolist</p>
                                        {
                                            this.state.todolist.map(data => {
                                                return <DashboardTodolist key={data.id} nama_todo={data.nama_todo} />
                                            })
                                        }
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