import React  from 'react';
import {HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Main from './pages/Main';
import Login from './pages/Login/login';
import Administrar from './pages/Administrar/administrar';
import Product from './pages/Product/product';
import Products from './pages/Products/products';

function HtmlRoutes(){
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/Product/:id" element={<Product />} />
                <Route path="/admin" element = {<Administrar />} />
            </Routes>
        </HashRouter>
    );
}

export default HtmlRoutes;
