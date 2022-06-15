import React, { Component } from "react";
import IncomeList from "../../components/incomeList";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './income.css';
import {
    Link
} from "react-router-dom";
import { async } from "@firebase/util";

class Income extends Component {
    constructor() {
        super();

        this.user = auth.currentUser.uid;
        this.data = [];
        this.state = {
            allData: [],
            'category': '',
            'date': '',
            'income': '',
            'title': '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "income", auth.currentUser.uid, "items"));
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
    handleDelete = async (id) => {
        deleteDoc(doc(db, "income", auth.currentUser.uid, "items", id))
            .then(
                this.fetchData()
            )
    }

    componentDidMount() {

        this.fetchData();
        console.log(this.data);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit = async (e) => {
        e.preventDefault();

        const { category, date, income, title } = this.state;
        const res = await addDoc(collection(db, "income", auth.currentUser.uid, "items"), {
            "category": category,
            "date": date,
            "income": income,
            "title": title
        })
            .then(
                this.fetchData()
            )
            .then((docRef) => {
                this.setState({
                    category: "",
                    date: "",
                    income: "",
                    title: ""
                })
            })
        console.log(res);
    }



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
        var listofData = this.state.allData.map((val, i) => {
            var category = val.category
            var date = val.date
            var income = val.income
            var title = val.title
            var id = val.id

            return (
                <div className="income-item row mt-4">
                    <div className="col-auto">
                        <img src={require('./gaji.png')} alt="category-logo" />

                    </div>
                    <div className="col nama-pemasukan align-self-center">
                        <p className="m-0">{title}</p>
                    </div>
                    <div className="col jumlah align-self-center">
                        <p className="m-0">{income}</p>

                    </div>
                    <div className="col-auto delete align-self-center">
                        <button onClick={
                            () => {
                                this.handleDelete(id)
                            }
                        }>
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </div>
                </div>

            )
        })
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

                        {/* untuk saldo balance */}
                        <div className="card-saldo-balance mb-5">
                            <div className="card-body mx-4 my-3">
                                <div className="row">
                                    <div className="col title-balance-right text-center d-flex justify-content-center">
                                        <button href="#" className="arrow float-end"><ion-icon name="chevron-back-outline"></ion-icon></button>

                                    </div>
                                    <div className="col date-balance text-center d-flex justify-content-center">
                                        <h5> June 2022</h5>
                                    </div>

                                    <div className="col title-balance-left text-center d-flex justify-content-center">
                                        <button href="#" className="arrow float-end"><ion-icon name="chevron-forward-outline"></ion-icon></button>

                                    </div>
                                    <div>
                                        <hr className="mt-2 text-center d-flex justify-content-center text-center" />
                                    </div>
                                </div>
                                <h1 className="text-center mt-1 mb-2">Rp 3.245.500</h1>
                                <div className="row  ">
                                    <div className="col pemasukan align-self-center justify-content-center text-center mt-2">
                                        <h5>Income</h5>
                                        <h3>Rp 5.000.000</h3>
                                    </div>
                                    <div className="col pengeluaran align-self-center justify-content-center text-center mt-3">
                                        <h5>Outcome</h5>
                                        <h3>Rp 1.754.500</h3>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="card-information-insert mb-5">
                            <div className="card-body mx-4 my-3">
                                <div className="row">
                                    <div className="col-md-auto col-sm">
                                        {/* <div className="card-total-pemasukan mb-3">
                                            <div className="card-body mx-2 my-1">
                                                <h5>Total pemasukan</h5>
                                                <div className="row  ">
                                                    <div className="col nominal mt-2">
                                                        <h3>135.000</h3>
                                                    </div>
                                                    <div className="col rupiah mt-3">
                                                        <h5>Rupiah</h5>
                                                    </div>

                                                </div>
                                            </div>
                                        </div> */}



                                        {/* <div className="card-presentase mb-2">
                                            <div className="card-body mx-2 my-1"> */}
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
                                    {/* </div>
                                    </div> */}
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
                                            <select className="form-control category-select mb-3" name="category" id="category" onChange={this.onChange} >
                                                <option value="0">--</option>
                                                <option value="gaji">Gaji</option>
                                                <option value="orangtua">Orang Tua</option>
                                                <option value="hadiah">Hadiah</option>
                                                <option value="investasi">Investasi</option>
                                                <option value="lain">Lain-Lain</option>
                                            </select>
                                            <input type="number" className="form-control px-4 mb-3" name="income" id="income" placeholder="Jumlah (Rp.)" onChange={this.onChange} />
                                            <input type="text" className="form-control px-4 mb-5" name="title" id="title" placeholder="Catatan" onChange={this.onChange} />
                                            <button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Tambah</button>
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
                                    {listofData}
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