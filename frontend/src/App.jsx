import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
// import AddProduct from './Pages/AddProduct';
// import ProductList from './Pages/ProductList';
// import UpdateProduct from './Pages/UpdateProduct';
import UserRegister from './Pages/UserRegister';
// import Login from './Pages/Auth/Login';
// import UserList from './Pages/UserList';
// import UpdateUser from './Pages/UpdateUser';

function App() {
    return (
        <Router>
            <Nav />
            <div style={{ padding: '2rem' }}>
                <Routes>
                    {/* <Route path="/" element={<ProductList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/edit/:id" element={<UpdateProduct />} />
                    <Route path="/users" element={<UserList />} /> */}
                    <Route path="/register" element={<UserRegister />} />
                    {/* <Route path="/edituser/:id" element={<UpdateUser />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
