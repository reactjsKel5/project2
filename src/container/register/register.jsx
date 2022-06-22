import { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pictRegist from "../../img/pict-regist.png";
import "./register.css";
import { UserAuth } from "../../context/AuthContext";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [nama, setNama] = useState("");
    const [nohp, setNohp] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { createUser } = UserAuth();
    let navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     try {
    //         await createUser(email, nama, nohp, password);
    //         navigate('/')
    //     }
    //     catch (err) {
    //         setError(err.message);
    //         console.log(err.message);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == '' && password == '' && nama == '' && nohp == '') {
            setError("Harap isi data")
        } else {
            try {
                await createUser(email, password);
                console.log("INI UID : " + auth.currentUser.uid);
                const res = await setDoc(doc(db, "users", auth.currentUser.uid), {
                    "email": email,
                    "nama_lengkap": nama,
                    "password": password,
                    "phone": nohp,
                    "prof_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJcY12Mz55YZo_e9PUaOSTCfF6rsmxaadwA&usqp=CAU"
                });
                console.log(res);
                navigate('/Dashboard');
            } catch (e) {
                if (e.code == 'auth/email-already-in-use') {
                    setError("Email telah terdaftar")
                } else if (e.code == 'auth/weak-password') {
                    setError("Password harus minimal 6 karakter")
                } else if (e.code == 'auth/invalid-email') {
                    setError("Masukkan format email yang benar")
                }
                // setError(e.message);
                console.log(e.message);
            }
        }
    };



    //menampilkan data mahasiswa
    // ambilDataDariAPI = () => {
    //     fetch('http://localhost:3001/profile')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 profile: json
    //             })
    //         })
    // }

    //insertdata user
    // handleInsertData = (event) =>{
    //     let forminsertprofile = {...this.state.insertprofile};
    //     let timestamp = new Date().getTime();
    //     forminsertprofile['id']= timestamp;
    //     forminsertprofile[event.target.name] = event.target.value;
    //     this.setState({
    //         insertprofile: forminsertprofile
    //     });
    // }

    //tombol insert data
    // handleTombolDaftar = (event) => {
    //     event.preventDefault();
    //     fetch('http://localhost:3001/profile', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(this.state.insertprofile)
    //     })
    //     .then(respose => Response.json())
    //     .then(json => this.ambilDataDariAPI)
    // }

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

                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Masukkan Nama Lengkap" className="form-control mb-4 mt-5" id="nama_lengkap" name="nama_lengkap" onChange={(e) => setNama(e.target.value)} />
                                    <input type="tel" placeholder="Masukkan Nomor Telephone" className="form-control mb-4 " id="no_hp" name="no_hp" onChange={(e) => setNohp(e.target.value)} />
                                    <input type="text" placeholder="Masukkan Email Anda" className="form-control mb-4 " id="email" name="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                                    <input type="password" placeholder="Masukkan Password" className="form-control mb-4" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />

                                    <p className="to-login mt-5">Sudah punya akun? <Link to="/login"><a>Login</a></Link></p>
                                    <button type="Submit" className="btn btn-primary" onClick={handleSubmit}>DAFTAR</button>
                                    <span><p className="text-center mt-5">{error}</p></span>

                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>

    );


}
export default Register;