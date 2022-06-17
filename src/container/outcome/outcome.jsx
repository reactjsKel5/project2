import React, { Component } from "react";
import OutList from "../../components/outcome";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './outcome.css';
import {
    Link
} from "react-router-dom";
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';


class Outcome extends Component {
    constructor() {
        super();
        this.user = auth.currentUser.uid;
        this.data = [];
        this.state = {
            keyData: '',
            allData: [],
            allDataProfile: [],
            'category': '',
            'date': '',
            'outcome': '',
            'title': '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "outcome", auth.currentUser.uid, "items"));
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
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "items"));
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            console.log(list);
            this.setState({
                allDataProfile: list
            })
            this.state.allDataProfile = list;
            console.log(this.state.allDataProfile)
        } catch (e) {
            console.log(e);
        }
    }


    handleDelete = async (id) => {
        deleteDoc(doc(db, "outcome", auth.currentUser.uid, "items", id))
            .then(
                this.fetchData()
            )
    }

    componentDidMount() {
        this.fetchData();
        this.fetchDataProfile();
        console.log(this.data);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { category, date, outcome, title } = this.state;
        const res = await addDoc(collection(db, "outcome", auth.currentUser.uid, "items"), {
            "category": category,
            "date": date,
            "outcome": outcome,
            "title": title
        })
            .then(
                this.fetchData()
            )
            .then((docRef) => {
                this.setState({
                    category: "",
                    date: "",
                    outcome: "",
                    title: ""
                })
            })
        console.log(res);
    }

    handleHookUpdate = (keyOutcome, categoryOutcome, outcomeOutcome, titleOutcome) => {

        this.setState({
            keyData: keyOutcome,
            category: categoryOutcome,
            outcome: outcomeOutcome,
            title: titleOutcome
        })

        console.log(this.state.keyData);
    }

    handleUpdate = async (event) => {
        event.preventDefault();

        const { category, outcome, title } = this.state;

        const res = await setDoc(doc(db, "outcome", auth.currentUser.uid, "items", this.state.keyData), {
            "category": category,
            "outcome": outcome,
            "title": title
        })
            .then(this.fetchData)
            .then((docRef) => {
                this.setState({
                    keyData: "",
                    category: "",
                    outcome: "",
                    title: ""
                })
            })
    }


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

        const {category, outcome, title } = this.state;

        var listofData = this.state.allData.map((val, i) => {
            var category = val.category
            var date = val.date
            var outcome = val.outcome
            var title = val.title
            var id = val.id
            return (
                <div className="income-item row mt-4">
                    <div className="col-auto">
                        <img src={require('./gaji.png')} alt="category-logo"/>
                    </div>
                    <div className="col nama-pemasukan align-self-center">
                        <p className="m-0">{title}</p>
                    </div>
                    <div className="col jumlah align-self-center">
                        <p className="m-0">{outcome}</p>
                    </div>
                    <div className="col-auto delete align-self-center">
                    <button 
                            onClick={
                                () => {
                                    this.handleHookUpdate(id, category, outcome, title);
                                }
                            }
                        >
                            <ion-icon name="create-outline"></ion-icon>
                        </button>

                        <button className="btn-delete float-end"
                            onClick={
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

        var listofDataProfile = this.state.allDataProfile.map((val, i) => {
            var nama_lengkap = val.nama_lengkap
        return (
            <div className="topbar">
            <div className="toggle">
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div className="user-information row">
                <div className="col name align-self-center">
                    <h6>{nama_lengkap}</h6>
                </div>
                <div className="col user">
                    <img src="https://images.unsplash.com/photo-1638204957796-4ad60705aa17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" width="200" alt="user-photo" />
                </div>
            </div>
        </div>
        )
    })

        return (
            <div>
                <Sidebar />
                <div className="main">
                    {/* <Topbar /> */}
                    {listofDataProfile}

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
                                        <hr className="mt-2 text-center d-flex justify-content-center" />
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
                                                <h5>Total pengeluaran</h5>
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
                            <div className="card-body mx-2 my-1">
             */}
                                        <h3>Chart</h3>
                                        <h5>Presentase pengeluaran</h5>
                                        <div className="row d-flex mt-4">
                                            <div className="col-md-auto col-sm">
                                                <img src={require('./advanced.png')} alt="chart" />
                                            </div>
                                            <div className="col align-self-center">
                                                <ul>
                                                    <li>Makan</li>
                                                    <li>Gaya Hidup</li>
                                                    <li>Kebutuhan Rumah</li>
                                                    <li>Lain-lain</li>
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
                                            <select className="form-control category-select mb-3" name="category" id="category" onChange={this.onChange} value={category}>
                                                <option value="0">--</option>
                                                <option value="makan">Makan</option>
                                                <option value="kecantikan">Kecantikan</option>
                                                <option value="gaya hidup">Gaya Hidup</option>
                                                <option value="kebutuhan">Kebutuhan Rumah</option>
                                                <option value="Kesehatan">Kesehatan</option>
                                                <option value="lain">Lain-lain</option>
                                            </select>
                                            <input type="number" className="form-control px-4 mb-3" name="outcome" id="outcome" placeholder="Jumlah (Rp.)" onChange={this.onChange} value={outcome} />
                                            <input type="text" className="form-control px-4 mb-5" name="title" id="title" placeholder="Catatan" onChange={this.onChange} value={title} />
                                            {
                                                this.state.keyData == '' ? (<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}>Tambah</button>) : <button className="btn btn-danger d-inline-block" onClick={(event) => this.handleUpdate(event)}>Simpan</button>


                                            }
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
                                    {listofData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            // </div>
            // </div>
            // </div>
        );
    }
}

export default Outcome;