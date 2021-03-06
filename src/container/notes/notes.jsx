import React, { Component } from 'react'
import Sidebar from "../../components/menubar/sidebar"
import Topbar from "../../components/menubar/topbar"
// import Todo from "../../component/todo"
import './notes.css';
import Note from "../../components/note"
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import swal from 'sweetalert';
import { Warning } from "postcss";

export class Notes extends Component {
    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.userUid = localStorage.getItem("userUid");
        this.data = [];
        this.state = {
            keyData: '',
            allData: [],
            allDataProfile: [],
            // "title": '',
            // "body": '',
            // 'date': ''
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "notes", this.userUid, "items"));
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
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

    fetchDataProfile = async () => {
        var list = [];
        try {
            const querySnapshot = await getDoc(doc(db, "users", this.userUid))
                .then((docRef) => {
                    this.setState({
                        email: docRef.data()['email'],
                        nama_lengkap: docRef.data()['nama_lengkap'],
                        phone: docRef.data()['phone'],
                        prof_img: docRef.data()['prof_img'],
                    })
                    console.log(this.state)
                })
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {

        this.fetchData();
        this.fetchDataProfile();
        console.log(this.data);
    }

    onChange = (e) => {
        const state = this.state
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        state[e.target.name] = e.target.value;
        state['date'] = date;
        this.setState(state);
    }

    handleDelete = async (id) => {
        deleteDoc(doc(db, "notes", this.userUid, "items", id))
            .then(
                this.fetchData()
            )
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { title, body, date } = this.state;
        try {
            const res = await addDoc(collection(db, "notes", this.userUid, "items"), {
                "title": title,
                "body": body,
                "date": date
            })
                .then(
                    this.fetchData()
                )
                .then((docRef) => {
                    this.setState({
                        title: "",
                        body: "",
                        date: ""
                    })
                })

            console.log(res);
        } catch (error) {
            swal({
                title: 'Invalid Input!',
                text: 'Please fill the form.',
                icon: 'warning',
                dangerMode: true
            });

        }
    }

    handleHookUpdate = (keyNote, titleNote, bodyNote) => {

        this.setState({
            keyData: keyNote,
            title: titleNote,
            body: bodyNote
        })

        console.log(this.state.keyData);

    }

    handleUpdate = async (event) => {

        event.preventDefault();

        const { title, body, date } = this.state;

        const res = await setDoc(doc(db, "notes", this.userUid, "items", this.state.keyData), {
            "title": title,
            "body": body,
            "date": date
        })
            .then(this.fetchData)
            .then((docRef) => {
                this.setState({
                    search: '',
                    keyData: "",
                    title: "",
                    body: "",
                    date: ""
                })
            })
    }

    handleSearch = (event) => {
        var searchData = event.target.value;
        console.log(searchData);

        if (searchData == "") {
            this.fetchData();
        } else {
            var filteredData = this.state.allData.filter((value) => {
                return value.title.toLowerCase().includes(searchData.toLowerCase());
            });

            this.setState({
                allData: filteredData
            })
            this.state.allData = filteredData;
        }


        console.log(this.state.allData)
    }


    render() {

        const { title, body } = this.state;
        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;

        var listofData = this.state.allData.map((val, i) => {
            var title = val.title
            var body = val.body
            var date = val.date
            var id = val.id
            return (
                <div key={{ i }} className="list-notes card-notes mb-3">
                    <div className="card-body my-4 mx-3">
                        <button className="btn-delete float-end"
                            onClick={
                                () => {
                                    this.handleDelete(id)
                                }
                            }>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>

                        <button className="btn-delete float-end"
                            onClick={
                                () => {
                                    this.handleHookUpdate(id, title, body);
                                }
                            }
                        >
                            <ion-icon name="create-outline"></ion-icon>
                        </button>

                        <h5 className="card-title float-none">{title}</h5>
                        <h6>{date}</h6>
                        <p>{body}</p>
                    </div>
                </div>
            )
        })



        // var buttonNote = (if (this.state.keyData == '') {
        //     return(<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Tambah</button>)
        // } else {
        //     return(<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Simpan</button>)
        // })

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
                    <div className="m-md-5 notes">
                        <div className="search-notes">
                            {/* <div className="card">
                                <div className="card-body"> */}
                            <form action="submit" className="row">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control px-4"
                                        name="nama_todo"
                                        id="nama_todo"
                                        placeholder="Search in here ..."
                                        onChange={this.handleSearch} />
                                </div>
                                {/* <div className="col-md-auto col-sm align-self-center">
                                    <button className="btn btn-danger d-inline-block">
                                        Cari</button>
                                </div> */}
                            </form>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-7 col-sm">
                                <div className="row">
                                    {listofData}
                                </div>
                            </div>
                            <div className="col-md-5 col-sm">
                                <div className="add-notes card-notes">
                                    <div className="card-body my-4 mx-3">
                                        <form action="submit">
                                            <input type="text" className="form-control px-4 mb-3" name="title" id="name" placeholder="Title" onChange={this.onChange} value={title} />
                                            <div className="form-floating">
                                                <textarea className="form-control px-4 mb-3" name="body" id="body" placeholder="isi_note" onChange={this.onChange} value={body}></textarea>
                                                <label for="isi_note" className="text-secondary">Detail Note</label>
                                            </div>
                                            {
                                                this.state.keyData == '' ? (<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Save</button>) : <button className="btn btn-danger d-inline-block" onClick={(event) => this.handleUpdate(event)}>Simpan</button>
                                            }
                                            {/* <button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Tambah</button> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notes