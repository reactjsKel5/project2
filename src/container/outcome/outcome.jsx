import React, { Component } from "react";
import OutList from "../../components/outcome";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './outcome.css';
import {
    Link
} from "react-router-dom";
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import DonutChart from "react-donut-chart";
import Food from '../outcome/Food.png';


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
            'outcome': 0,
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
            const querySnapshot = await getDoc(doc(db, "users", this.user))
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
            "outcome": Number(outcome),
            "title": title
        })
            .then(
                this.fetchData()
            )
            .then((docRef) => {
                this.setState({
                    category: "",
                    date: "",
                    outcome: 0,
                    title: ""
                })
            })
        console.log(res);
    }

    handleHookUpdate = (keyOutcome, categoryOutcome, dateOutcome, outcomeOutcome, titleOutcome) => {

        this.setState({
            keyData: keyOutcome,
            category: categoryOutcome,
            date: dateOutcome,
            outcome: outcomeOutcome,
            title: titleOutcome
        })

        console.log(this.state.keyData);
    }

    handleUpdate = async (event) => {
        event.preventDefault();

        const { category, date, outcome, title } = this.state;

        const res = await setDoc(doc(db, "outcome", auth.currentUser.uid, "items", this.state.keyData), {
            "category": category,
            "date": date,
            "outcome": outcome,
            "title": title
        })
            .then(this.fetchData)
            .then((docRef) => {
                this.setState({
                    keyData: "",
                    category: "",
                    date: "",
                    outcome: 0,
                    title: ""
                })
            })
    }

    render() {

        const { category, date, outcome, title } = this.state;
        // const {makan, kecantikan, gayahidup, kebutuhan} = this.state;
        // if (category == "makan" ){
        //     <img src={require('./gaji.png')} alt="category-logo"/>
        //  }

        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;


        var listofData = this.state.allData.map((val, i) => {
            var category = val.category

            var date = val.date
            var outcome = val.outcome
            var title = val.title
            var id = val.id
            return (
                <div className="income-item row mt-4">
                    <div className="col-auto">
                        {/* <img src={`${category}.png`} alt="category-logo"/> */}
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
                                    <div className="col date-balance text-center d-flex justify-content-center">
                                        <h1 className="text-center mt-1 mb-2">Rp 3.245.500</h1>
                                    </div>
                                    <div>
                                        <hr className="mt-2 text-center d-flex justify-content-center text-center" />
                                    </div>
                                </div>
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

                                        <h3>Chart</h3>
                                        <h5>Presentase pengeluaran</h5>
                                        <div className="row d-flex mt-4">
                                            <div className="col-md-auto col-sm" style={{ height: 250 }}>
                                                <DonutChart
                                                    width={350}
                                                    height={350}
                                                    data={[
                                                        {
                                                            label: 'Food',
                                                            value: 45,
                                                            // isEmpty: true,
                                                        },
                                                        {
                                                            label: 'Entertainment',
                                                            value: 25,
                                                            //   isEmpty: true,
                                                        },
                                                        {
                                                            label: 'Education',
                                                            value: 25,
                                                            //   isEmpty: true,
                                                        },
                                                        {
                                                            label: 'etc',
                                                            value: 25,
                                                        },
                                                    ]}
                                                >
                                                    {/* <div style={{ fontSize: 52 }}>
                                                    <strong>Rp. 135.000</strong>
                                                </div> */}
                                                </DonutChart>

                                                {/* <img src={require('./advanced.png')} alt="chart" /> */}
                                            </div>
                                            {/* <div className="col align-self-center">
                                                 <ul>
                                                     <li>Makan</li>
                                                    <li>Gaya Hidup</li>
                                                     <li>Kebutuhan Rumah</li>
                                                     <li>Lain-lain</li>
                                                 </ul>
                                             </div> */}
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
                                                <option value="Food">Food</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Education">Education</option>
                                                <option value=".etc">.etc</option>
                                            </select>
                                            <input type="date" className="form-control px-4 mb-3" name="date" id="date" onChange={this.onChange} value={date} />
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