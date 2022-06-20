import React, { Component } from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";

import Logo from '../../img/logo.jpg';
import Header from '../../img/header.jpeg';
import Section2_1 from '../../img/section2-1.jpg';
import Section2_2 from '../../img/section2-2.jpg';
import Section2_3 from '../../img/section2-3.jpg';
import Section3 from '../../img/section3.jpeg';
import Section4 from '../../img/section4.jpeg';
import Section5 from '../../img/section5.jpeg';
import Playstore from '../../img/playstore.jpg';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light" id="nav">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <img src={ Logo } alt="logo Coller Lifestyle" width="80px" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#about">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://bit.ly/DemoCollerApp">Tutorial</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Review</a>
                                    </li>
                                </ul>
                                <div className="d-flex">
                                    <Link to = "/Login">
                                    <a><button className="btn btn-login bg-transparent me-5">Login</button></a>
                                    </Link>
                                    <Link to ="/Register">
                                    <a ><button className="btn btn-primary">Register</button></a>
                                    </Link>                                    
                                </div>
                            </div>
                        </div>
                    </nav>
                    <section className="section-header mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="header-content">
                                    <h1><b>Manajemen perkuliahan dengan COLLER</b></h1>
                                    <h5 className="my-5">Coller adalah aplikasi yang akan membantu kamu di dalam dunia perkuliahan.</h5>
                                    <a href="#feature">
                                        <button type="button" className="btn btn-outline-dark">Expolre Features</button>
                                    </a>
                                </div>
                            </div>
                            <div className="col align-self-center img-header">
                                <img src={ Header } className="float-end" alt="header" />
                            </div>
                        </div>
                    </section>
                    <section className="section-2 mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="card text-center">
                                    <div className="card-body row mx-3 my-2">
                                        <div className="col">
                                            <img src={ Section2_1 } />
                                            <h2 className="my-4"><b>Lengkap</b></h2>
                                            <h5 className="my-2">COLLER memiliki fitur-fitur yang
                                                lengkap untuk manajemen
                                                perkuliahan</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-center">
                                    <div className="card-body row mx-3 my-2">
                                        <div className="col">
                                            <img src={ Section2_2 } />
                                            <h2 className="my-4"><b>Sederhana</b></h2>
                                            <h5 className="my-2">COLLER dirancang menjadi sebuah
                                                platform yang sederhana untuk
                                                semua pengguna terutama
                                                mahasiswa</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-center">
                                    <div className="card-body row mx-3 my-2">
                                        <div className="col">
                                            <img src={ Section2_3 } />
                                            <h2 className="my-4"><b>Fleksibel</b></h2>
                                            <h5 className="my-2">COLLER tersedia dalam 2 platform
                                                yaitu website dan android</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-3 mt-3">
                        <div className="row my-5">
                            <div className="col-4 align-self-center img-header">
                                <img src={ Section3 } alt="header" />
                            </div>
                            <div className="col-8">
                                <div className="header-content">
                                    <h1><b>Kami Hadir untuk Mempermudah Kehidupan Perkuliahan Anda</b></h1>
                                    <h5 className="my-5">Coller dapat membantu anda untuk mencatat dengan sederhana,
                                        coller juga dapat membantu anda dalam manajemen keuangan
                                        agar keuangan anda tetap stabil, coller juga dapat membantu anda
                                        membuat jadwal aktivitas.</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="feature" className="section-4 mt-3">
                        <div className="row">
                            <div className="col-6">
                                <div className="header-content">
                                    <h1><b>Kami Memiliki 2 Fitur Unggulan</b></h1>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="col">
                                                <h2><b>Collage Management</b></h2>
                                                <h5 className="my-2">Terdiri dari fitur notes, todolist, schedule
                                                    dan task</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="col">
                                                <h2><b>Money Management</b></h2>
                                                <h5 className="my-2">Terdiri dari fitur outcame dan incame</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <img src={ Section4 } alt="header" />
                            </div>
                        </div>
                    </section>
                    <section className="section-5 mt-3">
                        <div className="row">
                            <div className="col-5">
                                <img src={ Section5 } alt="header" />
                            </div>
                            <div className="col-7">
                                <div className="header-content">
                                    <h1><b>Apa Kata Pengguna yang Sudah Menggunakan COLLER?</b></h1>
                                    <h5 className="my-5">“Coller merupakan platform yang sangat berguna buat mahasiswa,
                                        coller bener-bener dirancang untuk anak kuliahan dengan berbagai
                                        fitur-fiturnya yang sangat relate dengan kehidupan perkuliahan.
                                        Senang sekali mengguanakn COLLER, sangatlah membantu”</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="section-download mx-auto text-center" id="about">
                    <div className="features-title mx-auto">
                        <h2>Try <span>Coller </span>Today!</h2>
                        <h5>Get started for free</h5>
                        <div className="button-menu my-3">
                            <a href="#">
                                <img src={ Playstore } alt="playstore" />
                            </a>
                            <Link to ="/Register">
                            <a><button className="btn btn-primary">Register</button></a>
                            </Link>
                        </div>
                    </div>
                </section>
                <footer className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Coller <span>.</span> com</h3>
                            <div className="link-menu">
                                <a href="#nav">Home</a>
                                <a href="#" className="mx-4">Download App</a>
                                <a href="mailto: work.khoirunnisa@gmail.com">Contact</a>
                            </div>
                        </div>
                        <div className="col copyright text-end align-self-center">
                            <p>Copyright ©2022 All rights reserved | This website is made by <span>KBL Team</span></p>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default LandingPage;