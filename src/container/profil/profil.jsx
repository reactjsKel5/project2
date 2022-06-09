import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './profil.css'

import ProfileProps from "../../components/profilprops";
import {Link} from "react-router-dom";

class Profil extends Component {

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