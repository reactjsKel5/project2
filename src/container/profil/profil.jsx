import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil.css'
import Avatar from 'react-avatar';

import ProfileProps from "../../components/profilprops";
import {Link} from "react-router-dom";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';

class Profil extends Component {
    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.userUid = localStorage.getItem("userUid");
        this.data = [];
        this.state = {
            allData: [],
            "email": '',
            "nama_lengkap": '',
            "phone": '',
            "prof_img": ''
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDoc(doc(db, "users", this.userUid))
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

    componentDidMount(){
        
        this.fetchData();
        console.log(this.data);
    }

    render() {
        const nama_lengkap = this.state.nama_lengkap;
        const email = this.state.email;
        const phone = this.state.phone;
        const prof_img = this.state.prof_img;
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
                    <div className="m-md-5 profile">
                        <div className="row">
                            <div className="card-profile">
                                <div className="card-body">
                                    <div class="card-text">
                                        <div className="row">
                                            <div className="row p-4">
                    <div className="text-center mb-5">
                        <Avatar src={prof_img} size={170}  round={true} alt="profile" />
                    </div>
                    <div class="mb-1">
                        <p class="profile-title float-start">Full Name</p>
                        <p class="profile-title float-end">
                            {nama_lengkap}
                        </p>
                    </div>

                    <hr className="mb-4" />
                    <div class="mb-1">
                        <p class="profile-title float-start">Email Address</p>
                        <p class="profile-value float-sm-end">
                            {email}

                        </p>
                    </div>
                    <hr className="mb-4" />
                    <div class="mb-4">
                        <p class="profile-title float-start">Telephone</p>
                        <p class="profile-value float-sm-end">
                            {phone}
                        </p>
                    </div>
                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-md-5">
                        <div className="col-md-12 text-center" >
                            <Link to="/editProfile">
                                <button className="btn btn-danger-profile">Edit Profile</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//     }
// }

export default Profil;