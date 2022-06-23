import React, { Component } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import '../profil_edit/profil_edit.css';
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import swal from 'sweetalert';

class EditPassword extends Component {

    constructor() {
        super();
        this.userUid = localStorage.getItem("userUid");
        this.state = {
            uid: "",
            newPass: "",
            confPass: "",
            oldPass: "",
            "email": "",
            "nama_lengkap": "",
            "password": "",
            "phone": "",
            "prof_img": ""
        }

    }

    componentDidMount() {
        this.fetchDataProfile();
    }

    fetchDataProfile = async () => {
        try {
            await getDoc(doc(db, "users", this.userUid))
                .then((docRef) => {
                    this.setState({
                        email: docRef.data()['email'],
                        nama_lengkap: docRef.data()['nama_lengkap'],
                        password: docRef.data()['password'],
                        phone: docRef.data()['phone'],
                        prof_img: docRef.data()['prof_img']
                    })
                    console.log("Password sekarang : " + this.state);
                })
        } catch (e) {
            console.log(e);
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        const { newPass, confPass, oldPass } = this.state;
        const { email, nama_lengkap, phone, prof_img } = this.state;
        const user = auth.currentUser;

        if (newPass != confPass) {
            swal("Gagal", "Password Pasword Tidak Sama!", "warning");
            return console.log("Password tidak sama")

        } else if (oldPass != this.state["password"]) {
            swal("Gagal", "Password Pasword Salah!", "error");
            return console.log("Password salah!")
        } else {
            try {
                await updatePassword(user, newPass)
                    .then(async () => {
                        await setDoc(doc(db, "users", auth.currentUser.uid), {
                            "email": email,
                            "nama_lengkap": nama_lengkap,
                            "password": newPass,
                            "phone": phone,
                            "prof_img": prof_img
                        }).then(() => {
                            // alert("Password berhasil di ubah!")
                            swal("Berhasil", "Password Telah di Ubah!", "success");
                            console.log("password firestore di update! | " + newPass)

                        })


                        console.log("Sukses ganti password : " + newPass);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }



    render() {
        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;
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
                    <div className="profile-edit m-md-5">
                        <div className="card-profile-edit">
                            <div className="card-body m-4">

                                <div className="form-edit">
                                    <form onSubmit={this.onSubmit}>

                                        <h2 className="mb-5">Change Your Password</h2>

                                        <label htmlFor="new-password" className="form-label">New Password</label>
                                        <input type="password" className="form-control mb-4 " id="newPass" name="newPass" onChange={this.onChange} />

                                        <label htmlFor="conf-new-password" className="form-label ">Konfirmasi Password</label>
                                        <input type="password" className="form-control mb-4 " id="confPass" name="confPass" onChange={this.onChange} />

                                        <label htmlFor="password" className="form-label ">Password Lama</label>
                                        <input type="password" className="form-control mb-4" id="oldPass" name="oldPass" onChange={this.onChange} />

                                        <div className="row button-section mt-5">

                                            <div className="col text-center">
                                                <button className="btn btn-danger-profile-edit float-end"
                                                >Simpan</button></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditPassword;