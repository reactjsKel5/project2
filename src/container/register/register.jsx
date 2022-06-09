import { Component } from "react";
import { Link } from "react-router-dom";
import pictRegist from "../../img/pict-regist.png";
import "./register.css"

class Register extends Component {
    state ={
        profile: [],
        insertprofile: {
            id:'',
            nama_lengkap:'',
            no_hp:'',
            email:'',
            password:''
        }
    }
    //menampilkan data mahasiswa
    ambilDataDariAPI = () => {
        fetch('http://localhost:3001/profile')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    profile: json
                })
            })
    }

    //insertdata user
    handleInsertData = (event) =>{
        let forminsertprofile = {...this.state.insertprofile};
        let timestamp = new Date().getTime();
        forminsertprofile['id']= timestamp;
        forminsertprofile[event.target.name] = event.target.value;
        this.setState({
            insertprofile: forminsertprofile
        });
    }

    //tombol insert data
    handleTombolDaftar = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.insertprofile)
        })
        .then(respose => Response.json())
        .then(json => this.ambilDataDariAPI)
    }

    render() {
        return (
            
            <div>
                <main>
                    <div className="row register">
                        <div className="col col-left p-5 text-center ">
                            <img src={pictRegist} className="m-auto" alt="gambar-regist" />
                            <h5>Mulai Atur Gaya Hidupmu</h5>
                            <h3>Sekarang</h3>
                        </div>

                        <div className="col col-left text-center">
                            <div className="card-register">
                                <div className="card-body m-4">
                                    <h3>Buat Akun Baru</h3>
                                    <p>Lengkapi Data Diri Anda</p>
                                    
                                    <form >
                                        <input type="text" placeholder="Masukkan Nama Lengkap" className="form-control mb-4 mt-5" id="nama_lengkap" name="nama_lengkap"  onChange={this.handleInsertData}/>
                                        <input type="text" placeholder="Masukkan Nomor Telephone" className="form-control mb-4 " id="no_hp" name="no_hp" onChange={this.handleInsertData}/>
                                        <input type="text" placeholder="Masukkan Email Anda" className="form-control mb-4 " id="email" name="email" aria-describedby="emailHelp" onChange={this.handleInsertData} />
                                        <input type="password" placeholder="Masukkan Password" className="form-control mb-4" id="password" name="password" onChange={this.handleInsertData} />

                                        <p className="to-login mt-5">Sudah punya akun? <Link to="/login"><a>Login</a></Link></p>
                                        <button type="submit" className="btn btn-primary" onClick={this.handleTombolDaftar}>DAFTAR</button>


                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
                </main>
            </div>

        )
    }

}
export default Register;