import React, { Component } from 'react'
import Sidebar from "../../components/menubar/sidebar"
import Topbar from "../../components/menubar/topbar"
// import Todo from "../../component/todo"
import './notes.css';
import Note from "../../components/note"

export class Notes extends Component {

    state = {
        notes: [],
        insertNote : {
            uid: 2,
            id: 1,
            judul_note: "",
            tgl_note: "2022-01-06",
            isi_note: ""
        }
    }

    //get Notes
    fetchNotes = () => {
        fetch('http://localhost:3001/notes?_sort=id_note8&_order=desc')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    notes: json
                })
            })
    }

    componentDidMount() {
        this.fetchNotes()
    }

    //delete notes by id
    deleteNotes = (id) => {
        fetch(`http://localhost:3001/notes/${id}`, {
            method: 'DELETE'
        })
            .then(json => {
                this.fetchNotes()
            })
    }

    //handle value
    handleChangeInsert = (event) => {
        let insertNoteData = {...this.state.insertNote}
        let timestamp = new Date().getTime()
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        insertNoteData['id'] = timestamp
        insertNoteData['tgl_note'] = date
        insertNoteData[event.target.name] = event.target.value
        this.setState({
            insertNote: insertNoteData
        })
    }

    //insert to API
    addNote = (event) => {
        event.preventDefault()
        fetch('http://localhost:3001/notes', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertNote)
        })
            .then(response => response.json())
            .then(json => this.fetchNotes())
    }

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="main">
                    <Topbar/>

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
                                                placeholder="Cari"/>
                                        </div>
                                        <div className="col-md-auto col-sm align-self-center">
                                            <button className="btn btn-danger d-inline-block">
                                                Cari</button>
                                        </div>
                                    </form>
                                {/* </div>
                            </div> */}
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-7 col-sm">
                                <div className="row">
                                    {
                                        this.state.notes.map((note) =>{
                                            return <Note id={note.id} key={note.id} judul={note.judul_note} tanggal={note.tgl_note} isi={note.isi_note} delete={this.deleteNotes}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-md-5 col-sm">
                                <div className="add-notes card-notes">
                                    <div className="card-body my-4 mx-3">
                                        <form action="submit">
                                            <input type="text" className="form-control px-4 mb-3" name="judul_note" id="judul_note" placeholder="Judul Note" onChange={this.handleChangeInsert} />
                                            <div className="form-floating">
                                                <textarea className="form-control px-4 mb-3" name="isi_note" id="isi_note" placeholder="isi_note" onChange={this.handleChangeInsert} />
                                                <label for="isi_note" className="text-secondary">Deskripsi Note</label>
                                            </div>
                                            <button className="btn btn-danger d-inline-block" onClick={this.addNote}>Tambah</button>
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