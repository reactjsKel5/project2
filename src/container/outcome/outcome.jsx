import React, { Component } from "react";
import OutList from "../../components/outcome";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './outcome.css';
import {
    Link
} from "react-router-dom";

class Outcome extends Component {
    // state = {
    //     listOutcome: [],
    //     addOutcome: {
    //         id: 1,
    //         uid: 1,
    //         pengeluaran: 1,
    //         kategori_pengeluaran: 1,
    //         tgl_pengeluaran: "2022-03-25",
    //         catatan: "",
    //         saldo: 0
    //     },
    //     kategori: []
    // }


    // getOutcome = () => {
    //     fetch('http://localhost:3001/pengeluaran')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 listOutcome: json
    //             })
    //         })
    // }

    // getCat = () => {
    //     fetch('http://localhost:3001/kategori_pengeluaran')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 kategori: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.getOutcome()
    //     this.getCat()
    // }

    // handleDelete = (id) => {
    //     fetch(`http://localhost:3001/pengeluaran/${id}`, { method: 'DELETE' })
    //         .then(res => {
    //             this.getOutcome()
    //         })
    // }

    // handleAdd = (event) => {
    //     let insertOutcome = { ...this.state.addOutcome };
    //     let timestamp = new Date().getTime();
    //     insertOutcome['id'] = timestamp;
    //     insertOutcome[event.target.name] = event.target.value;
    //     this.setState({
    //         addOutcome: insertOutcome
    //     });
    // }

    // // insert to API
    // insertOutcome = (event) => {
    //     event.preventDefault();
    //     fetch('http://localhost:3001/pengeluaran', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.addOutcome)
    //     })
    //         .then(response => response.json())
    //         .then(json => this.getOutcome())
    // }

    render() {
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

                    {/* Tulis content di bawah sini */}
                    <div className="outcome-container mx-md-5 my-5">
                        <div className="row d-flex mb-5">
                            <div className="col align-self-center">
                                <h2>Money Management.</h2>
                            </div>
                            <div className="col-auto col-sm">
                                <div className="card-tab-outcome float-end">
                                    <div className="card-body text-center">
                                        <Link to="/Pemasukan"><a className="link-to-outcome" style={{ color: '#464646' }}>Pemasukan</a></Link>
                                        <div className="btn btn-tab-outcome ms-3"><a href="#">Pengeluaran</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-information-insert mb-5">
                            <div className="card-body mx-4 my-3">
                                <div className="row">
                                    <div className="col-md-auto col-sm">
                                        <h3>Chart</h3>
                                        <h5>Presentase pengeluaran</h5>
                                        <div className="row d-flex mt-4">
                                            <div className="col-md-auto col-sm">
                                                <img src={require('./advanced.png')} alt="chart" />
                                            </div>
                                            <div className="col align-self-center">
                                                <ul>
                                                    <li>Gaji</li>
                                                    <li>Orang Tua</li>
                                                    <li>Hadiah</li>
                                                    <li>Investasi</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col add-income ps-5">
                                        <div className="row mb-3">
                                            <div className="col">
                                                <h3>Tambahkan</h3>
                                            </div>
                                            <div className="col date-picker text-end">
                                                <a href="#">Hari ini</a>
                                            </div>
                                        </div>
                                        <form action="submit">
                                            <select className="form-control category-select mb-3" name="nama_kategori_pengeluaran" id="nama_kategori_pengeluaran" onChange={this.handleAdd} >
                                                {/* {
                                                    this.state.kategori.map(cat => {
                                                        return <option value={cat.nama_kategori_pengeluaran}>{cat.nama_kategori_pengeluaran}</option>
                                                    })
                                                } */}
                                            </select>
                                            <input type="number" className="form-control px-4 mb-3" name="pengeluaran" id="pengeluaran" placeholder="Jumlah (Rp.)" onChange={this.handleAdd} />
                                            <input type="text" className="form-control px-4 mb-5" name="catatan" id="catatan" placeholder="Catatan" onChange={this.handleAdd} />
                                            <button className="btn btn-danger d-inline-block" onClick={this.insertOutcome}>Tambah</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>Daftar Pengeluaran.</h2>
                        <div className="income-list mt-3">
                            <div className="card-income-list mb-3">
                                <div className="card-body m-3">
                                    <small>28/02/2022</small>
                                    {/* {
                                        this.state.listOutcome.map(data => {
                                            return <OutList key={data.id} uid={data.uid} pengeluaran={data.pengeluaran} catatan={data.catatan} id={data.id} delete={this.handleDelete} />
                                        })
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Outcome;