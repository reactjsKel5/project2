import React, { Component } from "react";
import IncomeList from "../../components/incomeList";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import { auth, db } from '../../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, setDoc, getDoc, query, where } from 'firebase/firestore';
import './income.css';
import {
    Link
} from "react-router-dom";
import { async } from "@firebase/util";
import DonutChart from "react-donut-chart/dist/DonutChart";

//update untuk category blum muncul
class Income extends Component {
    constructor() {
        super();

        this.userUid = localStorage.getItem("userUid");
        this.data = [];
        this.state = {
            totincome: 0,
            totoutcome: 0,
            totsalary: 0,
            totparent: 0,
            totgift: 0,
            totetc: 0,
            keyData: '',
            allData: [],
            allDataProfile: [],
            'category': '',
            'date': '',
            'income': 0,
            'title': '',
        };
    }

    fetchData = async () => {
        var list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "income", this.userUid, "items"));
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
    fetchSalary = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "income", this.userUid, "items"), where("category", "==", "Salary")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["income"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ totsalary: data });
        console.log("Salary : " + this.state.totsalary);
    }

    fetchParent = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "income", this.userUid, "items"), where("category", "==", "Parent")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["income"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ totparent: data });
        console.log("Parent : " + this.state.totparent);
    }

    fetchGift = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "income", this.userUid, "items"), where("category", "==", "Gift")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["income"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ totgift: data });
        console.log("Gift : " + this.state.totgift);
    }

    fetchEtc = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "income", this.userUid, "items"), where("category", "==", ".etc")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["income"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ totetc: data });
        console.log("Etc : " + this.state.totetc);
    }

    fetchDataProfile = async () => {
        var list = [];
        try {
            const querySnapshot = await getDoc(doc(db, "users", this.userUid))
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
        deleteDoc(doc(db, "income", this.userUid, "items", id))
            .then(
                this.fetchData()
            )
    }

    componentDidMount() {
        this.fetchData();
        this.fetchDataProfile();
        this.fetchDataIncome();
        this.fetchDataOutcome();
        this.fetchSalary();
        this.fetchParent();
        this.fetchGift();
        this.fetchEtc();
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
        const res = await addDoc(collection(db, "income", this.userUid, "items"), {
            "category": category,
            "date": date,
            "income": Number(income),
            "title": title
        })
            .then(
                this.fetchData()
            )
            .then((docRef) => {
                this.fetchData();
                // this.fetchDataProfile();
                this.fetchDataIncome();
                this.fetchDataOutcome();
                this.fetchSalary();
                this.fetchParent();
                this.fetchGift();
                this.fetchEtc();
                this.setState({
                    category: "",
                    date: "",
                    income: 0,
                    title: ""
                })
            })
        console.log(res);
    }
    // , categoryIncome,
    handleHookUpdate = (keyIncome, categoryIncome, dateIncome, incomeIncome, titleIncome) => {

        this.setState({
            keyData: keyIncome,
            category: categoryIncome,
            date: dateIncome,
            income: incomeIncome,
            title: titleIncome
        })

        console.log(this.state.keyData);
    }

    handleUpdate = async (event) => {
        event.preventDefault();

        const { category, date, income, title } = this.state;

        const res = await setDoc(doc(db, "income", this.userUid, "items", this.state.keyData), {
            "category": category,
            "date": date,
            "income": Number(income),
            "title": title
        })
            .then(this.fetchData)
            .then((docRef) => {
                this.fetchData();
                this.fetchDataIncome();
                this.fetchDataOutcome();
                this.fetchSalary();
                this.fetchParent();
                this.fetchGift();
                this.fetchEtc();
                this.setState({
                    keyData: "",
                    category: "",
                    date: "",
                    income: 0,
                    title: ""
                })
            })
    }

    fetchDataIncome = async () => {
        var totalIncome = 0;

        try {
            const querySnapshot = await getDocs(collection(db, "income", this.userUid, "items"))
            querySnapshot.forEach((doc) => {
                totalIncome = totalIncome + doc.data()["income"];
                console.log(doc.data()["income"]);

            });
            console.log(totalIncome);
        } catch (e) {
            console.log(e);
        }
        this.setState({ totincome: totalIncome })
        console.log(totalIncome);

    }

    fetchDataOutcome = async () => {
        var totalOutcome = 0;

        try {
            const querySnapshot = await getDocs(collection(db, "outcome", this.userUid, "items"))
            querySnapshot.forEach((doc) => {
                totalOutcome = totalOutcome + doc.data()["outcome"];
                console.log(doc.data()["outcome"]);
            });
            console.log(totalOutcome);
        } catch (e) {
            console.log(e);
        }
        this.setState({ totoutcome: totalOutcome })
        console.log(totalOutcome);

    }




    render() {

        const { category, date, income, title } = this.state;
        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;

        //show data total
        const TotalIncome = this.state.totincome;
        const TotalOutcome = this.state.totoutcome;
        const Balance = TotalIncome - TotalOutcome;
        console.log(Balance);

        // show per category
        var TotalSalary = this.state.totsalary;
        console.log("total salary: " + TotalSalary);

        var TotalParent = this.state.totparent;
        console.log("total parent: " + TotalParent);

        var TotalGift = this.state.totgift;
        console.log("total gift: " + TotalGift);

        var TotalEtc = this.state.totetc;
        console.log("total etc: " + TotalEtc);

        // operation persentase
        var persenSalary = Math.round(TotalSalary / TotalIncome * 100);
        console.log("persensalary:" + persenSalary);
        var persenParent = Math.round(TotalParent / TotalIncome * 100);
        console.log("persenparent:" + persenParent);
        var persenGift = Math.round(TotalGift / TotalIncome * 100);
        var persenEtc = Math.round(TotalEtc / TotalIncome * 100);


        var listofData = this.state.allData.map((val, i) => {
            var image = '';
            var category = val.category
            var date = val.date
            var income = val.income
            var title = val.title
            var id = val.id
            switch (category) {
                case 'Salary': image = require('../../img/gaji.png');
                    break;
                case 'Parent': image = require('../../img/orang-tua.png');
                    break;
                case 'Gift': image = require('../../img/hadiah.png');
                    break;
                default: image = require('../../img/Etc.png');
            }

            return (
                // <div key={{ i }} className="list-income card-incomes mb3">
                <div className="income-item row mt-4">
                    <div className="col-auto">
                        <img src={image} alt={category} width={30} />

                    </div>
                    <div className="col nama-pemasukan align-self-center">
                        <p className="m-0">{title}</p>
                    </div>
                    <div className="col nama-category align-self-center">
                        <p className="m-0">{category}</p>
                    </div>
                    <div className="col jumlah align-self-center">
                        <p className="m-0">Rp. {income}</p>
                    </div>
                    <div className="col tanggal align-self-center">
                        <p className="m-0">{date}</p>
                    </div>

                    <div className="col-auto delete align-self-center">

                        <button
                            onClick={
                                () => {
                                    this.handleHookUpdate(id, category, date, income, title);
                                }
                            }
                        >
                            <ion-icon name="pencil-outline"></ion-icon>
                        </button>

                        <button className="btn-delete float-end ms-3" onClick={
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
                    <div className="income-container mx-md-5 my-5">
                        <div className="row d-flex mb-5">
                            <div className="col align-self-center">
                                <h2>Money Management.</h2>
                            </div>
                            <div className="col-auto col-sm">
                                <div className="card-tab-income float-end">
                                    <div className="card-body text-center">
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
                                    <div className="col date-balance text-center d-flex justify-content-center">
                                        <h1 className="text-center mt-1 mb-2">Rp {Balance}</h1>
                                    </div>
                                    <div>
                                        <hr className="mt-2 text-center d-flex justify-content-center text-center" />
                                    </div>
                                </div>

                                <div className="row  ">
                                    <div className="col pemasukan align-self-center justify-content-center text-center mt-2">
                                        <h5>Income</h5>
                                        <h3>Rp {TotalIncome}</h3>
                                    </div>
                                    <div className="col pengeluaran align-self-center justify-content-center text-center mt-3">
                                        <h5>Outcome</h5>
                                        <h3>Rp {TotalOutcome}</h3>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="card-information-insert mb-5">
                            <div className="card-body mx-5 my-3">
                                <div className="row">
                                    <div className="col-md-auto col-sm">
                                        <h3>Chart</h3>
                                        <h5>Presentase pemasukan</h5>
                                        <div className="row d-flex mt-4">
                                            <div className="col-md-auto col-sm" style={{ height: 380 }}>
                                                <DonutChart
                                                    width={550}
                                                    height={360}
                                                    strokeColor='#ffffff'
                                                    data={[
                                                        {
                                                            label: 'Salary',
                                                            value: persenSalary,
                                                            // isEmpty: true,
                                                        },
                                                        {
                                                            label: 'Parent',
                                                            value: persenParent,
                                                            //   isEmpty: true,
                                                        },
                                                        {
                                                            label: 'Gift',
                                                            value: persenGift,
                                                            //   isEmpty: true,
                                                        },
                                                        {
                                                            label: '.etc',
                                                            value: persenEtc,
                                                        },
                                                    ]}
                                                >
                                                    <div style={{ fontSize: 52 }}>
                                                        <strong>Rp. 135.000</strong>
                                                    </div>
                                                </DonutChart>

                                                {/* <div className="col align-self-center">
                                                <ul>
                                                    <li>Gaji</li>
                                                    <li>Orang Tua</li>
                                                    <li>Hadiah</li>
                                                    <li>Investasi</li>
                                                </ul>
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div>
                                    </div> */}
                                    <div className="col add-income ps-5">
                                        <h3 className="mb-5 mt-2">Tambahkan</h3>

                                        <form action="submit">
                                            <select className="form-control category-select mb-3" name="category" id="category" onChange={this.onChange} value={category} >
                                                <option value="0">--</option>
                                                <option value="Salary">Salary</option>
                                                <option value="Parent">Parent</option>
                                                <option value="Gift">Gift</option>
                                                <option value=".etc">.etc</option>

                                            </select>
                                            <input type="date" className="form-control px-4 mb-3" name="date" id="date" onChange={this.onChange} value={date} />
                                            <input type="number" className="form-control px-4 mb-3" name="income" id="income" placeholder="Jumlah (Rp.)" onChange={this.onChange} value={income} />
                                            <input type="text" className="form-control px-4 mb-5" name="title" id="title" placeholder="Catatan" onChange={this.onChange} value={title} />

                                            {
                                                this.state.keyData == '' ? (<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}
                                                >Tambah</button>) : <button className="btn btn-danger d-inline-block" onClick={(event) => this.handleUpdate(event)}>Simpan</button>


                                            }

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="mt-5 mb-4">Income History.</h2>
                        <div className="income-list mt-3">
                            <div className="card-income-list mb-3">
                                <div className="card-body m-3">

                                    {listofData}

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