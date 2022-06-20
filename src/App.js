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
import Task from './container/task/task';
import Todolist from './container/todolist/todolist';
import Outcome from './container/outcome/outcome';
import Income from './container/income/income';
import Profil from './container/profil/profil';
import ProfilEdit from './container/profil_edit/profil_edit';
import LandingPage from './container/landingpage/landingpage';
function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
        <Route path='/' element={<LandingPage />} />
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
          <Route path='CollegeManagement/Task' element = {<ProtectedRoute><Task/></ProtectedRoute>}/>
          <Route path='CollegeManagement/Todolist' element = {<ProtectedRoute><Todolist/></ProtectedRoute>}/>
          <Route path='/Pengeluaran' element = {<ProtectedRoute><Outcome/></ProtectedRoute>}/>
          <Route path='/Pemasukan' element = {<ProtectedRoute><Income/></ProtectedRoute>}/>
          <Route path='/Profile' element = {<ProtectedRoute><Profil/></ProtectedRoute>}/>
          <Route path='/editProfile' element = {<ProtectedRoute><ProfilEdit/></ProtectedRoute>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Landing' element={<LandingPage/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
