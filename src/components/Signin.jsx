// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { signIn } = UserAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('')
//     try {
//       await signIn(email, password)
//       navigate('/account')
//     } catch (e) {
//       setError(e.message)
//       console.log(e.message)
//     }
//   };

//   return (
//     <div className="row login">
//       <div className="col col-left p-5 text-center d-flex justify-content-center">
//         <img src={pictLogin} className="m-auto" alt="login image" />
//       </div>
//       <div className="col align-self-center d-flex justify-content-center">
//         <div className="card">
//           <div className="card-body">
//             <h3>Selamat Datang!</h3>
//             <p>Masukkan email dan password Anda</p>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <input type="text" placeholder="Email" className="form-control mb-3 mt-5" id="username" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
//             <p className="text-center mt-5">Belum memiliki akun? <Link to="/register"><a>Daftar</a></Link></p>
//             <button type="submit" className="btn btn-primary">Masuk</button>
//             {error && <span><p className="text-center mt-5">Email atau Password Salah !!!</p></span>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;