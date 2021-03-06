import React, { Component } from "react";
import OutList from "../../components/outcome";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './outcome.css';
import {
    Link
} from "react-router-dom";
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, getDocs, deleteDoc, setDoc, query, where, getDoc } from 'firebase/firestore';
import DonutChart from "react-donut-chart";
import swal from 'sweetalert';
import { Warning } from "postcss";

class Outcome extends Component {
    constructor() {
        super();
        this.userUid = localStorage.getItem("userUid");
        this.data = [];
        this.state = {
            totincome: 0,
            totoutcome: 0,
            totfood: 0,
            totentertain: 0,
            toteducation: 0,
            totetc: 0,
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
            const querySnapshot = await getDocs(collection(db, "outcome", this.userUid, "items"));
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

    fetchFood = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "outcome", this.userUid, "items"), where("category", "==", "Food")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["outcome"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ totfood: data });
        console.log("Food : " + this.state.totfood);
    }

    fetchEntertain = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "outcome", this.userUid, "items"), where("category", "==", "Entertainment")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["outcome"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ totentertain: data });
        console.log("Entertainment : " + this.state.totentertain);
    }

    fetchEducation = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "outcome", this.userUid, "items"), where("category", "==", "Education")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["outcome"];
            })
        } catch (e) {
            console.log(e);
        }
        this.setState({ toteducation: data });
        console.log("Education : " + this.state.toteducation);
    }

    fetchEtc = async () => {
        var data = 0;
        try {
            const querySnapshot = await getDocs(query(collection(db, "outcome", this.userUid, "items"), where("category", "==", ".etc")));
            querySnapshot.forEach((doc) => {
                data = data + doc.data()["outcome"];
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
        deleteDoc(doc(db, "outcome", auth.currentUser.uid, "items", id))
            .then(() => {
                this.fetchData();
                this.fetchDataIncome();
                this.fetchDataOutcome();
                this.fetchFood();
                this.fetchEntertain();
                this.fetchEducation();
                this.fetchEtc();
            })
    }

    componentDidMount() {
        this.fetchData();
        this.fetchDataProfile();
        this.fetchDataIncome();
        this.fetchDataOutcome();
        this.fetchFood();
        this.fetchEntertain();
        this.fetchEducation();
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
        const { category, date, outcome, title } = this.state;

        if (category, date, outcome, title == "") {
            swal({
                title: 'Invalid Input!',
                text: 'Please fill the form.',
                icon: 'warning',
                dangerMode: true
            });
        } else {
            const res = await addDoc(collection(db, "outcome", this.userUid, "items"), {
                "category": category,
                "date": date,
                "outcome": Number(outcome),
                "title": title
            })
                .then(
                    this.fetchData()
                )
                .then((docRef) => {
                    this.fetchData();
                    this.fetchDataIncome();
                    this.fetchDataOutcome();
                    this.fetchFood();
                    this.fetchEntertain();
                    this.fetchEducation();
                    this.fetchEtc();
                    this.setState({
                        category: "",
                        date: "",
                        outcome: 0,
                        title: "",
                    })
                })
            console.log(res);
        }
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

        const res = await setDoc(doc(db, "outcome", this.userUid, "items", this.state.keyData), {
            "category": category,
            "date": date,
            "outcome": Number(outcome),
            "title": title
        })
            .then(this.fetchData)
            .then((docRef) => {
                // taruh componentDidMount di sini
                this.fetchData();
                this.fetchDataIncome();
                this.fetchDataOutcome();
                this.fetchFood();
                this.fetchEntertain();
                this.fetchEducation();
                this.fetchEtc();
                this.setState({
                    keyData: "",
                    category: "",
                    date: "",
                    outcome: 0,
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

    formatter = (value) => {
        const price = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);

        return price;
        console.log(price)
    }

    render() {

        const { category, date, outcome, title } = this.state;
        // const {makan, kecantikan, gayahidup, kebutuhan} = this.state;
        // if (category == "makan" ){
        //     <img src={require('./gaji.png')} alt="category-logo"/>
        //  }

        const nama_lengkap = this.state.nama_lengkap;
        const prof_img = this.state.prof_img;

        //show total
        const TotalIncome = this.state.totincome;
        const TotalOutcome = this.state.totoutcome;
        const Balance = TotalIncome - TotalOutcome;
        console.log(Balance);

        // show per category
        var TotalFood = this.state.totfood;
        console.log("total food: " + TotalFood);

        var TotalEntertainment = this.state.totentertain;
        console.log("total entertainment: " + TotalEntertainment);

        var TotalEducation = this.state.toteducation;
        console.log("total education: " + TotalEducation);

        var TotalEtc = this.state.totetc;
        console.log("total etc: " + TotalEtc);

        // operation persentase
        var persenFood = Math.round(TotalFood / TotalOutcome * 100);
        console.log("persenfood:" + persenFood);
        var persenEntertainment = Math.round(TotalEntertainment / TotalOutcome * 100);
        var persenEducation = Math.round(TotalEducation / TotalOutcome * 100);
        var persenEtc = Math.round(TotalEtc / TotalOutcome * 100);



        var listofData = this.state.allData.map((val, i) => {
            var image = '';
            var category = val.category
            var date = val.date
            var outcome = val.outcome
            var title = val.title
            var id = val.id
            switch (category) {
                case 'Food': image = require('../../img/Food.png');
                    break;
                case 'Education': image = require('../../img/Education.png');
                    break;
                case 'Entertainment': image = require('../../img/Entertainment.png');
                    break;
                default: image = require('../../img/Etc.png');
            }
            return (
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
                        <p className="m-0">Rp. {outcome}</p>
                    </div>
                    <div className="col tanggal align-self-center">
                        <p className="m-0">{date}</p>
                    </div>
                    <div className="col-auto delete align-self-center">
                        <button
                            onClick={
                                () => {
                                    this.handleHookUpdate(id, category, date, outcome, title);
                                }
                            }
                        >
                            <ion-icon name="pencil-outline"></ion-icon>
                        </button>

                        <button className="btn-delete float-end ms-3"
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
                                        <Link to="/Pemasukan"><a className="link-to-outcome" style={{ color: '#464646' }}>Income</a></Link>
                                        <div className="btn btn-tab-outcome ms-3"><a href="#">Outcome</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-saldo-balance mb-5">
                            <div className="card-body mx-4 my-3">
                                <div className="row">
                                    <div className="col date-balance text-center d-flex justify-content-center">
                                        <h1 className="text-center mt-1 mb-2">{this.formatter(Balance)}</h1>
                                    </div>
                                    <div>
                                        <hr className="mt-2 text-center d-flex justify-content-center text-center" />
                                    </div>
                                </div>
                                <div className="row  ">
                                    <div className="col pemasukan align-self-center justify-content-center text-center mt-2">
                                        <h5>Income</h5>
                                        <h3>{this.formatter(TotalIncome)}</h3>
                                    </div>
                                    <div className="col pengeluaran align-self-center justify-content-center text-center mt-3">
                                        <h5>Outcome</h5>
                                        <h3>{this.formatter(TotalOutcome)}</h3>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="card-information-insert mb-5">
                            <div className="card-body mx-5 my-3">
                                <div className="row">
                                    <div className="col-md-auto col-sm">
                                        <h3>Chart</h3>
                                        <h5>% Outcome</h5>
                                        <div className="row d-flex mt-4">
                                            <div className="col-md-auto col-sm" style={{ height: 380 }}>
                                                <DonutChart
                                                    width={550}
                                                    height={360}
                                                    strokeColor='#ffffff'
                                                    data={[
                                                        {
                                                            label: 'Food',
                                                            value: persenFood,
                                                            // isEmpty: true,
                                                        },
                                                        {
                                                            label: 'Entertainment',
                                                            value: persenEntertainment,
                                                            //   isEmpty: true,
                                                        },
                                                        {
                                                            label: 'Education',
                                                            value: persenEducation,
                                                            //   isEmpty: true,
                                                        },
                                                        {
                                                            label: 'etc',
                                                            value: persenEtc,
                                                        },
                                                    ]}
                                                >
                                                    <div style={{ fontSize: 52 }}>
                                                        <strong>Rp. 135.000</strong>
                                                    </div>
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
                                        <h3 className="mb-5 mt-2">New Outcome</h3>
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
                                            <input type="text" className="form-control px-4 mb-5" name="title" id="title" placeholder="Title" onChange={this.onChange} value={title} />
                                            {
                                                this.state.keyData == '' ? (<button className="btn btn-danger d-inline-block" onClick={this.onSubmit}
                                                >Add New</button>) : <button className="btn btn-danger d-inline-block" onClick={(event) => this.handleUpdate(event)}>Save</button>
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="mt-5 mb-4">Outcome History.</h2>
                        <div className="income-list mt-3">
                            <div className="card-income-list mb-3">
                                <div className="card-body mx-4 mb-4">
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