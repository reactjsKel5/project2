import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil_edit.css';
import pict from "./jm2.jpg";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
//import  "bootstrap/dist/css/bootstrap.css";

class ProfilEdit extends Component {
    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.data = [];
        this.state = {
            allDataProfile: [],
        };
    }

    fetchDataProfile = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "items"));
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
        this.fetchDataProfile();
        console.log(this.data);
    }

    render() {
        var listofDataProfile = this.state.allDataProfile.map((val, i) => {
            var nama_lengkap = val.nama_lengkap
        return (
            <div className="topbar">
            <div className="toggle">
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div className="user-information row">
                <div className="col name align-self-center">
                    <h6>{nama_lengkap}</h6>
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
                    {/* <Topbar /> */}
                    {listofDataProfile}

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