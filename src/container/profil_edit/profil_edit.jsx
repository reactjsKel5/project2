import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil_edit.css';
import pict from "./jm2.jpg";

//import  "bootstrap/dist/css/bootstrap.css";

class ProfilEdit extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

                    {/* Tulis content di bawah sini */}
                    <div className="profile-edit m-md-5">
                        <div className="head mb-4">
                            <h2>Edit Profile.</h2>
                        </div>
                        <div className="card-profile-edit">
                            <div className="card-body m-4">
                                <div class="image mx-4 text-center">
                                    <img src={pict} alt="login image" />
                                    <div className="d-block mt-4">
                                        <button type="submit" className="btn btn-primary ">Ubah Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-edit">
                            <form action="submit">
                                <label htmlFor="nama" className="form-label ">Nama Lengkap</label>
                                <input type="text" className="form-control mb-4 " id="nama_lengkap" name="nama_lengkap" />

                                <label htmlFor="no-hp" className="form-label ">Nomor Telepon</label>
                                <input type="text" className="form-control mb-4 " id="no_hp" name="no_hp" />

                                <label htmlFor="email" className="form-label ">Email</label>
                                <input type="text" className="form-control mb-4 " id="email" name="email" aria-describedby="emailHelp" />

                                <label htmlFor="password" className="form-label ">Password</label>
                                <input type="password" className="form-control mb-4" id="password" name="password" />

                                <div className="row button-section mt-5">
                                    <div className="col">
                                        <button type="submit" className="btn btn-outline-danger">Hapus</button>
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-danger-profile-edit float-end">Simpan</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilEdit;