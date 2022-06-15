import React, { Component } from 'react'
import Sidebar from "../../components/menubar/sidebar"
import Topbar from "../../components/menubar/topbar"
// import Todo from "../../component/todo"
import './notes.css';
import Note from "../../components/note"
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

export class Notes extends Component {



    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.data = [];
        this.state = {
            keyData: '',
            allData: [],
            "title": '',
            "body": '',
            'date': ''
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "notes", auth.currentUser.uid, "items"));
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

    componentDidMount() {

        this.fetchData();
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
        deleteDoc(doc(db, "notes", auth.currentUser.uid, "items", id))
            .then(
                this.fetchData()
            )
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { title, body, date } = this.state;
        const res = await addDoc(collection(db, "notes", auth.currentUser.uid, "items"), {
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

        const { title, body } = this.state;

        const res = await setDoc(doc(db, "notes", auth.currentUser.uid, "items", this.state.keyData), {
            "title": title,
            "body": body
        })
            .then(this.fetchData)
            .then((docRef) => {
                this.setState({
                    keyData: "",
                    title: "",
                    body: "",
                    date: ""
                })
            })
    }

    // state = {
    //     notes: [],
    //     insertNote : {
    //         uid: 2,
    //         id: 1,
    //         judul_note: "",
    //         tgl_note: "2022-01-06",
    //         isi_note: ""
    //     }
    // }

    // //get Notes
    // fetchNotes = () => {
    //     fetch('http://localhost:3001/notes?_sort=id_note8&_order=desc')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 notes: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.fetchNotes()
    // }

    // //delete notes by id
    // deleteNotes = (id) => {
    //     fetch(`http://localhost:3001/notes/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(json => {
    //             this.fetchNotes()
    //         })
    // }

    // //handle value
    // handleChangeInsert = (event) => {
    //     let insertNoteData = {...this.state.insertNote}
    //     let timestamp = new Date().getTime()
    //     const current = new Date();
    //     const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    //     insertNoteData['id'] = timestamp
    //     insertNoteData['tgl_note'] = date
    //     insertNoteData[event.target.name] = event.target.value
    //     this.setState({
    //         insertNote: insertNoteData
    //     })
    // }

    // //insert to API
    // addNote = (event) => {
    //     event.preventDefault()
    //     fetch('http://localhost:3001/notes', {
    //         method: 'POST',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.insertNote)
    //     })
    //         .then(response => response.json())
    //         .then(json => this.fetchNotes())
    // }

    render() {

        const { title, body } = this.state;

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
                    <Topbar />

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
                                        placeholder="Search" />
                                </div>
                                <div className="col-md-auto col-sm align-self-center">
                                    <button className="btn btn-danger d-inline-block">
                                        Cari</button>
                                </div>
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
                                            <input type="text" className="form-control px-4 mb-3" name="title" id="name" placeholder="Judul Note" onChange={this.onChange} value={title} />
                                            <div className="form-floating">
                                                <textarea className="form-control px-4 mb-3" name="body" id="body" placeholder="isi_note" onChange={this.onChange} value={body}></textarea>
                                                <label for="isi_note" className="text-secondary">Deskripsi Note</label>
                                            </div>
                                            {
                                                this.state.keyData == '' ? (<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Tambah</button>) : <button className="btn btn-danger d-inline-block" onClick={(event) => this.handleUpdate(event)}>Simpan</button>
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