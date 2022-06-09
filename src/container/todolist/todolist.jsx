import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import Todo from "../../components/todo";
import './todolist.css';

class Todolist extends Component {
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
                                    <form action="submit" className="m-2 row">
                                        <div className="col">
                                            <input type="text" className="form-control px-4" name="nama_todo" id="nama_todo" placeholder="Tambahkan to do list baru di sini ..." onChange={this.handleChangeInsert} />
                                        </div>
                                        <div className="col-md-auto col-sm align-self-center">
                                            <button className="btn btn-danger d-inline-block" onClick={this.insertTodolist}> + Tambah</button>
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
                                            <button className="btn btn-light" onClick={this.deleteAllTodolist}>Hapus semua</button>
                                        </div>
                                    </div>
                                    <div className="row">
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