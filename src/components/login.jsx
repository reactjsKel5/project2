import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import pictLogin from '../pict-login.png';
import './login.css'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == '' && password == ''){
            setError("Harap Isi Field Email Dan Password !!")
        } else {
            try {
                await signIn(email, password)
                navigate('/dashboard')
            } catch (e) {
                if (e.code == 'auth/wrong-password') {
                setError("Password salah")
                } else if (e.code == 'auth/user-not-found') {
                    setError("Email tidak terdaftar")
                } else if (e.code == 'auth/invalid-email'){
                    setError ("Masukkan format email yang benar")
                }
                // setError(e.message)
                // console.log(e.message)
                console.log(e.code)
            }
        }
        
    };
    return (
        <div className="row login">
            <div className="col col-left p-5 text-center d-flex justify-content-center">
                <img src={pictLogin} className="m-auto" alt="login image" />
            </div>
            <div className="col align-self-center d-flex justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h3>Selamat Datang!</h3>
                        <p>Masukkan email dan password Anda</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email" className="form-control mb-3 mt-5" id="username" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                        <br />
                        <p className="text-center mt-5">Belum memiliki akun? <Link to="/register"><a>Daftar</a></Link></p>
                        <button type="submit" className="btn btn-primary">Masuk</button>
                        <span><p className="text-center mt-5">{error}</p></span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;