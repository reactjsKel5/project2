import React from 'react';
// import Signin from './components/Signin';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/login';
import Dashboard from "../src/container/dashboard/dashboard";
import MenuCM from './container/menuCM/menuCM';
import Register from './container/register/register';
import MenuMM from './container/menuMM/menuMM';
import Notes from './container/notes/notes';
import Schedule from './container/schedule/schedule';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/CollegeManagement' element={<ProtectedRoute><MenuCM/></ProtectedRoute>}/>
          <Route path='/MoneyManagement' element={<ProtectedRoute><MenuMM/></ProtectedRoute>}/>
          <Route path='/CollegeManagement/Notes' element = {<ProtectedRoute><Notes/></ProtectedRoute>}/>
          <Route path='CollegeManagement/Schedule' element = {<ProtectedRoute><Schedule/></ProtectedRoute>}/>
          <Route path='/Register' element={<Register/>}/>

        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
