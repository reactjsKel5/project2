import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './menuCM.css';
import {Link} from "react-router-dom";

class MenuCM extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

                    {/* Tulis content di bawah sini */}
                    <div className="content-cm mx-5 my-4">
                        <h2>College Management.</h2>
                        <div className="box"></div>
                        <div className="row information-section my-5">
                            <div className="col">
                                <div className="card-info">
                                    <div className="card-body row mx-3 my-2">
                                        <div className="col-auto number align-self-center">
                                            <h1>5</h1>
                                        </div>
                                        <div className="col label align-self-center">
                                            <h4>Task</h4>
                                            <p>Belum terselesaikan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card-info">
                                    <div className="card-body row mx-3 my-2">
                                        <div className="col-auto number align-self-center">
                                            <h1>3</h1>
                                        </div>
                                        <div className="col label align-self-center">
                                            <h4>Schedule</h4>
                                            <p>Untuk Hari Ini</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card-info">
                                    <div className="card-body row mx-3 my-2">
                                        <div className="col-auto number align-self-center">
                                            <h1>5</h1>
                                        </div>
                                        <div className="col label align-self-center">
                                            <h4>To do List</h4>
                                            <p>Belum terselesaikan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3>Menu.</h3>
                        <div className="row menu-cm-section mt-5">
                            <div className="col">
                                <Link to="/CollegeManagement/Notes">
                                    <a>
                                        <div className="card-cm-menu">
                                            <div className="card-body m-3 text-center">
                                                <div className="icon mx-auto mb-4"><img src="https://img.icons8.com/metro/26/F37970/thursday.png" /></div>
                                                <h5>Notes</h5>
                                                <p>Catatan Penting</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="col">
                                <Link to="/CollegeManagement/Schedule">
                                    <a>
                                        <div className="card-cm-menu">
                                            <div className="card-body m-3 text-center">
                                                <div className="icon mx-auto mb-4"><img src="https://img.icons8.com/material/28/F37970/note--v1.png" /></div>
                                                <h5>Schedule</h5>
                                                <p>Jadwal Perkuliahan</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="col">
                                <Link to="/CollegeManagement/Task">
                                    <a>
                                        <div className="card-cm-menu">
                                            <div className="card-body m-3 text-center">
                                                <div className="icon mx-auto mb-4"><img src="https://img.icons8.com/ios-filled/28/F37970/clipboard.png" /></div>
                                                <h5>Task</h5>
                                                <p>Daftar Tugas, Quis, dll</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="col">
                                <Link to="/CollegeManagement/Todolist">
                                    <a>
                                        <div className="card-cm-menu">
                                            <div className="card-body m-3 text-center">
                                                <div className="icon mx-auto mb-4"><img src="https://img.icons8.com/ios-filled/24/F37970/to-do.png" /></div>
                                                <h5>To do List</h5>
                                                <p>Yang harus dilakukan</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="m-5">
                        <div className="information">
                            <h2>College Management.</h2>
                            <p className="sub-title">Membantumu dalam mengelola urusan perkuliahan</p>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="card card-danger task">
                                        <div className="card-body row d-flex mx-3">
                                            <div className="col-auto number align-self-center">
                                                <h1>5</h1>
                                            </div>
                                            <div className="col label align-self-center">
                                                <h4>Task</h4>
                                                <p>Belum terselesaikan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card schedule">
                                        <div className="card-body row d-flex mx-3">
                                            <div className="col-auto number align-self-center">
                                                <h1>4</h1>
                                            </div>
                                            <div className="col label align-self-center">
                                                <h4 className="text-dark">Schedule</h4>
                                                <p>Untuk hari ini</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card card-danger todolist">
                                        <div className="card-body row d-flex mx-3">
                                            <div className="col-auto number align-self-center">
                                                <h1>3</h1>
                                            </div>
                                            <div className="col label align-self-center">
                                                <h4>Todolist</h4>
                                                <p>Belum terselesaikan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2>Menu.</h2>
                            <div className="row menu my-4">
                                <div className="col">
                                    <a href="#">
                                        <div className="card menu-notes">
                                            <div className="card-body m-4">
                                                <img src={require("../../img/ic_notes.png")} alt="ic_notes" />
                                                <h3 className="mt-4 mb-2">Notes</h3>
                                                <p>Catatan penting</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="#">
                                        <div className="card menu-schedule">
                                            <div className="card-body m-4">
                                                <img src={require("../../img/ic_schedule.png")} alt="ic_notes" />
                                                <h3 className="mt-4 mb-2">Schedule</h3>
                                                <p>Jadwal perkuliahan</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row menu">
                                <div className="col">
                                    <a href="#">
                                        <div className="card menu-task">
                                            <div className="card-body m-4">
                                                <img src={require("../../img/ic_task.png")} alt="ic_notes" />
                                                <h3 className="mt-4 mb-2">Task</h3>
                                                <p>Daftar quiz, tugas, dan lainnya</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="#">
                                        <div className="card menu-todolist">
                                            <div className="card-body m-4">
                                                <img src={require("../../img/ic_todolist.png")} alt="ic_notes" />
                                                <h3 className="mt-4 mb-2">To do list</h3>
                                                <p>Daftar yang harus dilakukan</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default MenuCM;