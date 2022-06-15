import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import Todo from "../../components/todo";
import './todolist.css';
import { auth, db, dbf } from '../../firebase';
import { addDoc, collection, doc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';

class Todolist extends Component {

    constructor() {
        super();
        // this.userUid = auth.currentUser.uid;
        // this.ref = db.firestore().collection('notes').doc(this.userUid).collection('items');
        // this.ref = db.collection('notes').doc(auth.currentUser.uid).collection('items');
        this.user = auth.currentUser.uid;
        this.state = {
            allData: [],
            "todos": '',
            "status": '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "todolist", auth.currentUser.uid, "items"));
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

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        state['status'] = 'false';
        this.setState(state);
    }

    handleDelete = async (id) => {
        deleteDoc(doc(db, "todolist", auth.currentUser.uid, "items", id))
            .then(
                this.fetchData()
            )
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const { todos, status } = this.state;
        const res = await addDoc(collection(db, "todolist", auth.currentUser.uid, "items"), {
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
    }

    handleStatus = async (id, todos, status) => {

        let updateStatus = (!status).toString();
        
        const res = await setDoc(doc(db, "todolist", auth.currentUser.uid, "items", id), {
            "todos": todos,
            "status": updateStatus
        })
        .then(this.fetchData)

        console.log(res);
        console.log(updateStatus);
    }

    // state = {
    //     todolist: [],
    //     insertTodo: {
    //         id: 1,
    //         uid: 1,
    //         nama_todo: "",
    //         status: 0
    //     }
    // }


    // // get todolist
    // fetchTodolist = () => {
    //     fetch('http://localhost:3001/todolist?_sort=id_note8&_order=desc')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 todolist: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.fetchTodolist()
    // }

    // // delete todolist by id
    // deleteTodolist = (id_todolist) => {
    //     fetch(`http://localhost:3001/todolist/${id_todolist}`, {
    //         method: 'DELETE'
    //     })
    //         .then(json => {
    //             this.fetchTodolist()
    //         })
    // }

    // // delete all todolist
    // deleteAllTodolist = (uid) => {
    //     fetch(`http://localhost:3001/todolist/${uid}`, {
    //         method: 'DELETE'
    //     })
    //         .then(json => {
    //             this.fetchTodolist()
    //         })
    // }

    // // handle value of field
    // handleChangeInsert = (event) => {
    //     let insertTodolistData = { ...this.state.insertTodo };
    //     let timestamp = new Date().getTime();
    //     insertTodolistData['id'] = timestamp;
    //     insertTodolistData[event.target.name] = event.target.value;
    //     this.setState({
    //         insertTodo: insertTodolistData
    //     });
    // }

    // // insert to API
    // insertTodolist = (event) => {
    //     event.preventDefault();
    //     fetch('http://localhost:3001/todolist', {
    //         method: 'POST',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.insertTodo)
    //     })
    //         .then(response => response.json())
    //         .then(json => this.fetchTodolist())
    // }
    render() {
        var listofData = this.state.allData.map((val, i) => {
            var todos = val.todos
            var status = (val.status === 'true')
            var id = val.id
            return(
                <div key={{ i }} className="form-check mx-3 mb-4">
            <input className="form-check-input" type="checkbox" value="status" id="status" 
                checked = {status}
                onChange = {
                () => {
                    this.handleStatus(id, todos, status)
                }
                }
            />
            <label className="form-check-label ms-3" for="todolist1">
                {todos}
            </label>
            <button className="btn-delete float-end" 
            onClick={
                () => {
                    this.handleDelete(id)
                }
            }>
                <ion-icon name="trash-outline"></ion-icon>
            </button>
            <button className="btn-delete float-end"
                        // onClick={
                        //     () => {
                        //         this.updateNote()
                        //     }
                        // }
                        >
                            <ion-icon name="create-outline"></ion-icon>
                        </button>
        </div>
            )
        })
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar/>

                    {/* Tulis content di bawah sini */}
                    <div className="m-md-5">
                        <div className="add-todolist">
                            <div className="card-todolist">
                                <div className="card-body">
                                    <form className="m-2 row">
                                        <div className="col">
                                            <input type="text" className="form-control px-4" name="todos" id="todos" placeholder="Tambahkan to do list baru di sini ..." onChange={this.onChange} />
                                        </div>
                                        <div className="col-md-auto col-sm align-self-center">
                                            <button className="btn btn-danger d-inline-block" onClick={this.onSubmit}> + Tambah</button>
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
                                        <div className="col text-end">
                                            <button className="btn btn-light" onClick={this.handleDelete}>Hapus semua</button>
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