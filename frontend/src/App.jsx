import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Pages/Profile';
import Todo from './Pages/Todo'; 
import UserLogin from './Pages/UserLogin';
import UserRegister from './Pages/UserRegister';
import ProtectedRoute from './Components/ProtectedRoute';
import Nav from './Components/Nav';
import AllTodos from './Pages/AllTodos';

function App() {
    const authToken = localStorage.getItem('authToken');

    return (

        <BrowserRouter>
        <Nav />
            <Routes>
            
                
                {/*Yeh public routes hain application k */}
                <Route path="/login" element={!authToken ? <UserLogin /> : <Navigate to="/profile" />} />
                <Route path="/register" element={!authToken ? <UserRegister /> : <Navigate to="/profile" />} />

                {/*Yeh protected routes hain application k */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Todo />} />
                    <Route path="/alltodos" element={<AllTodos />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Redirect to /profile if logged in, warna /login */}
                <Route path="*" element={<Navigate to={authToken ? "/profile" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
