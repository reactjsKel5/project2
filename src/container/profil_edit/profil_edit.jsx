import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil_edit.css';
import pict from "./jm2.jpg";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { storage } from '../../firebase';
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
//import  "bootstrap/dist/css/bootstrap.css";

class ProfilEdit extends Component {
    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.userUid = localStorage.getItem("userUid");
        this.data = [];
        this.state = {
            "imageUpload": null,
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
            const querySnapshot = await getDoc(doc(db, "users", this.userUid))
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

        const res = await setDoc(doc(db, "users", this.userUid), {
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

        const { image, setImage } = this.state;
        const { url, setUrl } = this.state;


        const handleChange = (e) => {
            if (e.target.files[0]) {
                this.setState({
                    imageUpload: e.target.files[0]
                })
                this.state.imageUpload = e.target.files[0];
                console.log("Image ada : " + this.state.imageUpload.name);
            } else {
                console.log("mana imagenya");
            }
        };

        const handleUpload = () => {
            const imageRef = ref(storage, `prof_img/${this.state.imageUpload.name}`);
            uploadBytes(imageRef, this.state.imageUpload).then(() => {
                getDownloadURL(imageRef).then(async (link) => {
                    const { email, nama_lengkap, password, phone } = this.state;

                    const res = await setDoc(doc(db, "users", this.userUid), {
                        "email": email,
                        "nama_lengkap": nama_lengkap,
                        "password": password,
                        "phone": phone,
                        "prof_img": link
                    })
                        .then(this.fetchDataProfile)

                });
            });
            // const uploadFoto = storage.ref(`prof_img/${image.name}`).put(image);
            // uploadFoto.on(
            //     "state_changed",
            //     snapshot => { },
            //     error => {
            //         console.log(error);
            //     },
            //     () => {
            //         storage
            //             .ref("prof_img")
            //             .child(image.name)
            //             .getDownloadURL()
            //             .then(url => {
            //                 setUrl(url);
            //             });
            //     }
            // );
        };

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
                                        <input type="file" onChange={handleChange} />
                                        <button onClick={handleUpload} className="btn btn-primary">Change Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-edit">
                            <form action="submit">
                                <label htmlFor="nama" className="form-label ">Full Name</label>
                                <input type="text" className="form-control mb-4 " id="nama_lengkap" name="nama_lengkap" onChange={this.onChange} value={nama_lengkap} />

                                <label htmlFor="no-hp" className="form-label ">Telephone</label>
                                <input type="text" className="form-control mb-4 " id="phone" name="phone" onChange={this.onChange} value={phone} />

                                <label htmlFor="email" className="form-label ">Email Address</label>
                                <input type="text" className="form-control mb-4 " id="email" name="email" aria-describedby="emailHelp" onChange={this.onChange} value={email} />

                                <label htmlFor="password" className="form-label ">Password</label>
                                <input type="password" className="form-control mb-4" id="password" name="password" onChange={this.onChange} value={password} />

                                <div className="row button-section mt-5">
                                    <div className="col">
                                        <Link to="/editProfile/editPassword">
                                            <button type="submit" className="btn btn-outline-danger">Change Password</button>
                                        </Link>
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