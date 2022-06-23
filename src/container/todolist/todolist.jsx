import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import Todo from "../../components/todo";
import './todolist.css';
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, doc, getDocs, deleteDoc, setDoc, getDoc} from 'firebase/firestore';

class Todolist extends Component {

    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.userUid = localStorage.getItem("userUid");
        this.state = {
            allData: [],
            allDataProfile: [],
            // "todos": '',
            // "status": '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "todolist", this.userUid, "items"));
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

    componentDidMount() {

        this.fetchData();
        this.fetchDataProfile();
        console.log(this.data);
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        state['status'] = 'false';
        this.setState(state);
    }

    handleDelete = async (id) => {
        deleteDoc(doc(db, "todolist", this.userUid, "items", id))
            .then(
                this.fetchData()
            )
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const { todos, status } = this.state;
        try {
            const res = await addDoc(collection(db, "todolist", this.userUid, "items"), {
                "todos": todos,
                "status": status
            })
                .then(this.fetchData)
                .then((docRef) => {
                    this.setState({
                        todos: "",
                        status: "",
                    })
                })
    
            console.log(res);
        } catch (error) {
            alert('Invalid Input!!!');
        }
    }

    handleStatus = async (id, todos, status) => {

        let updateStatus = (!status).toString();

        const res = await setDoc(doc(db, "todolist", this.userUid, "items", id), {
            "todos": todos,
            "status": updateStatus
        })
            .then(this.fetchData)

        console.log(res);
        console.log(updateStatus);
    }

    render() {
        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;

        var listofData = this.state.allData.map((val, i) => {
            var todos = val.todos
            var status = (val.status === 'true')
            var id = val.id
            return (
                <div key={{ i }} className="form-check mx-3 mb-4">
                    <input className="form-check-input" type="checkbox" value="status" id="status"
                        checked={status}
                        onChange={
                            () => {
                                this.handleStatus(id, todos, status)
                            }
                        }
                    />
                    <label className="form-check-label ms-3 mt-2" for="todolist1">
                        {todos}
                    </label>
                    <button className="btn-delete float-end mt-2"
                        onClick={
                            () => {
                                this.handleDelete(id)
                            }
                        }>
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>

                </div>
            )
        })
            

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
                            <img src={prof_img} alt="user-photo" />
                        </div>
                    </div>
                </div>

                    {/* Tulis content di bawah sini */}
                    <div className="m-md-5">
                        <div className="add-todolist">
                            <div className="card-todolist">
                                <div className="card-body">
                                    <form className="m-2 row">
                                        <div className="col">
                                            <input type="text" className="form-control px-4" name="todos" id="todos" placeholder="Add to do list in here ..." onChange={this.onChange} />
                                        </div>
                                        <div className="col-md-auto col-sm align-self-center">
                                            <button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Add New</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="todolist my-md-5">
                            <div className="card-todolist">
                                <div className="card-body m-4">
                                    <div className="row d-flex">
                                        <div className="col">
                                            <h2 className="mb-4">Today's To-dos</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {listofData}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todolist;