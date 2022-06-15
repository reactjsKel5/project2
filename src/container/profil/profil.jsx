import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil.css'

import ProfileProps from "../../components/profilprops";
import {Link} from "react-router-dom";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, doc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';

class Profil extends Component {

    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.state = {
            allData: [],
            "nama": '',
            "email": '',
            "nohp": '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "profile", auth.currentUser.uid, "items"));
            querySnapshot.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
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

    componentDidMount(){
        
        this.fetchData();
        console.log(this.data);
    }

    // state = {
    //     profile: []
    // }

    // fetchProfile = () => {
    //     fetch('http://localhost:3001/profile')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 profile: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.fetchProfile()
    // }

    render() {
        var listofData = this.state.allData.map((val, i) => {
            var nama = val.nama
            var email = val.email
            var nohp = val.nohp
            return(
                <div key={{ i }} className="row p-4">
            <div className="text-center mb-5">
                <img src={require('../../img/profile1.png')} width="170" alt="profile" />
            </div>
            <div class="mb-1">
                <p class="profile-title float-start">Nama Lengkap</p>
                <p class="profile-title float-end">
                    {nama}
                </p>
            </div>

            <hr className="mb-4" />
            <div class="mb-1">
                <p class="profile-title float-start">Email</p>
                <p class="profile-value float-sm-end">
                    {email}

                </p>
            </div>
            <hr className="mb-4" />
            <div class="mb-4">
                <p class="profile-title float-start">Nomor Telepon</p>
                <p class="profile-value float-sm-end">
                    {nohp}
                </p>
            </div>
        </div>
            )
        })
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />
                    <div className="m-md-5 profile">
                        <div className="row">
                            <div className="card-profile">
                                <div className="card-body">
                                    {/* <div className="col-md-12 text-center">
                                        
                                    </div>
                                    <br /> */}
                                    <div class="card-text">
                                        <div className="row">
                                            {/* {
                                                this.state.profile.map((profile) => {
                                                    return <ProfileProps key={profile.uid} id={profile.uid} nama_lengkap={profile.nama_lengkap} email={profile.email} no_hp={profile.no_hp} />
                                                })
                                            } */}
                                            {listofData}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-md-5">
                        <div className="col-md-12 text-center" >
                            <Link to="/editProfile">
                                <button className="btn btn-danger-profile">Edit Profil</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profil;