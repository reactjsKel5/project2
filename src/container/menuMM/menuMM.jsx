import React, { Component } from "react";
import Sidebar from "../../components/menubar/sidebar";
import Topbar from "../../components/menubar/topbar";
import './menuMM.css';
import {Link} from "react-router-dom";

class MenuMM extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div className="main">
                    <Topbar />

                    {/* Tulis content di bawah sini */}
                    <div className="money-management m-5">s
                        <h2>Money Management.</h2>
                        <div className="row my-5">
                            <div className="col">
                                <Link to="/Pemasukan">
                                    <div className="card">
                                        <div className="card-body m-4">
                                            <div className="row">
                                                <div className="col"><h3>Pemasukan</h3></div>
                                                <div className="col-auto end-0">
                                                    <img src={require("../../img/ic_income.png")} alt="ic_income" />
                                                </div>
                                            </div>
                                            <p className="sub-title mt-4 mb-0">Total Pemasukan</p>
                                            <div className="row">
                                                <div className="col-auto"><h1>135 000</h1></div>
                                                <div className="col align-self-end"><p>Rupiah</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            
                            <div className="col">
                                <Link to="/Pengeluaran">
                                    <div className="card">
                                        <div className="card-body m-4">
                                            <div className="row">
                                                <div className="col"><h3>Pengeluaran</h3></div>
                                                <div className="col-auto end-0">
                                                    <img src={require("../../img/ic_outcome.png")} alt="ic_income" />
                                                </div>
                                            </div>
                                            <p className="sub-title mt-4 mb-0">Total Pengeluaran</p>
                                            <div className="row">
                                                <div className="col-auto"><h1>127 000</h1></div>
                                                <div className="col align-self-end"><p>Rupiah</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuMM;