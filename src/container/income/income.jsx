import React, { Component } from "react";
import IncomeList from "../../components/incomeList";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './income.css';
import {
    Link
} from "react-router-dom";

class Income extends Component {
    // state = {
    //     listIncome: [],
    //     addIncome: {
    //         id: 1,
    //         uid: 1,
    //         pemasukan: 1,
    //         kategori_pemasukan: 1,
    //         tgl_pemasukan: "2022-03-25",
    //         catatan: "",
    //         saldo: 0
    //     },
    //     kategori: []
    // }


    // getIncome = () => {
    //     fetch('http://localhost:3001/pemasukan')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 listIncome: json
    //             })
    //         })
    // }

    // getCat = () => {
    //     fetch('http://localhost:3001/kategori_pemasukan')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 kategori: json
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.getIncome()
    //     this.getCat()
    // }

    // handleDelete = (id) => {
    //     fetch(`http://localhost:3001/pemasukan/${id}`, { method: 'DELETE' })
    //         .then(res => {
    //             this.getIncome()
    //         })
    // }

    // handleAdd = (event) => {
    //     let insertIncome = { ...this.state.addIncome };
    //     let timestamp = new Date().getTime();
    //     insertIncome['id'] = timestamp;
    //     insertIncome[event.target.name] = event.target.value;
    //     this.setState({
    //         addIncome: insertIncome
    //     });
    // }

    // // insert to API
    // insertIncome = (event) => {
    //     event.preventDefault();
    //     fetch('http://localhost:3001/pemasukan', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.addIncome)
    //     })
    //         .then(response => response.json())
    //         .then(json => this.getIncome())
    // }

    render() {
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

                    {/* Tulis content di bawah sini */}
                    <div className="income-container mx-md-5 my-5">
                        <div className="row d-flex mb-5">
                            <div className="col align-self-center">
                                <h2>Money Management.</h2>
                            </div>
                            <div className="col-auto col-sm">
                                <div className="card-tab-income float-end">
                                    <div className="card-body">
                                        <div className="btn btn-tab-income"><a href="#">Pemasukan</a></div>
                                        <Link to="/Pengeluaran"><a className="ms-3 link-to-outcome" style={{ color: '#464646' }}>Pengeluaran</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-information-insert mb-5">
                            <div className="card-body mx-4 my-3">
                                <div className="row">
                                    <div className="col-md-auto col-sm">
                                        <h3>Chart</h3>
                                        <h5>Presentase pemasukan</h5>
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
                                            <select className="form-control category-select mb-3" name="nama_kategori_pemasukan" id="nama_kategori_pemasukan" onChange={this.handleAdd} >
                                                {/* {
                                                    this.state.kategori.map(cat => {
                                                        return <option value={cat.nama_kategori_pemasukan}>{cat.nama_kategori_pemasukan}</option>
                                                    })
                                                } */}
                                            </select>
                                            <input type="number" className="form-control px-4 mb-3" name="pemasukan" id="pemasukan" placeholder="Jumlah (Rp.)" onChange={this.handleAdd} />
                                            <input type="text" className="form-control px-4 mb-5" name="catatan" id="catatan" placeholder="Catatan" onChange={this.handleAdd} />
                                            <button className="btn btn-danger d-inline-block" onClick={this.insertIncome}>Tambah</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>Daftar Pemasukan.</h2>
                        <div className="income-list mt-3">
                            <div className="card-income-list mb-3">
                                <div className="card-body m-3">
                                    <small>28/02/2022</small>
                                    {/* {
                                        this.state.listIncome.map(data => {
                                            return <IncomeList key={data.id} uid={data.uid} pemasukan={data.pemasukan} catatan={data.catatan} id={data.id} delete={this.handleDelete} />
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

export default Income;