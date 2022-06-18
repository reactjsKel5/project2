import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil_edit.css';
import pict from "./jm2.jpg";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
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
            "email": "",
            "nama_lengkap": "",
            "password": "",
            "phone": "",
            "prof_img": ""
        };
    }

    fetchDataProfile = async () => {
        var list = [];
        try {
            const querySnapshot = await getDoc(doc(db, "users", this.user))
                .then((docRef) => {
                    this.setState({
                        email: docRef.data()['email'],
                        nama_lengkap: docRef.data()['nama_lengkap'],
                        password: docRef.data()['password'],
                        phone: docRef.data()['phone'],
                        prof_img: docRef.data()['prof_img']
                    })
                })
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        this.fetchDataProfile();
        // console.log(this.data);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleUpdate = async (event) => {

        event.preventDefault();

        const { email, nama_lengkap, password, phone, prof_img } = this.state;

        const res = await setDoc(doc(db, "users", auth.currentUser.uid), {
            "email": email,
            "nama_lengkap": nama_lengkap,
            "password": password,
            "phone": phone,
            "prof_img": prof_img
        })
            .then(this.fetchDataProfile)
    }

    render() {
        const { email, nama_lengkap, password, phone, prof_img } = this.state;

        return (
            <div>
                <Sidebar />
                <div className="main">
                    {/* <Topbar /> */}
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

                    {/* Tulis content di bawah sini */}
                    <div className="profile-edit m-md-5">
                        <div className="head mb-4">
                            <h2>Edit Profile.</h2>
                        </div>
                        <div className="card-profile-edit">
                            <div className="card-body m-4">
                                <div class="image mx-4 text-center">
                                    <img src={prof_img} alt="login image" />
                                    <div className="d-block mt-4">
                                        <button type="submit" className="btn btn-primary ">Ubah Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-edit">
                            <form action="submit">
                                <label htmlFor="nama" className="form-label ">Nama Lengkap</label>
                                <input type="text" className="form-control mb-4 " id="nama_lengkap" name="nama_lengkap" onChange={this.onChange} value={nama_lengkap} />

                                <label htmlFor="no-hp" className="form-label ">Nomor Telepon</label>
                                <input type="text" className="form-control mb-4 " id="no_hp" name="no_hp" onChange={this.onChange} value={phone} />

                                <label htmlFor="email" className="form-label ">Email</label>
                                <input type="text" className="form-control mb-4 " id="email" name="email" aria-describedby="emailHelp" onChange={this.onChange} value={email} />

                                <label htmlFor="password" className="form-label ">Password</label>
                                <input type="password" className="form-control mb-4" id="password" name="password" onChange={this.onChange} value={password} />

                                <div className="row button-section mt-5">
                                    <div className="col">
                                        <button type="submit" className="btn btn-outline-danger">Hapus</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-danger-profile-edit float-end" onClick={(event) => this.handleUpdate(event)}>Simpan</button></div>
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