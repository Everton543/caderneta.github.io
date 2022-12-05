import React from 'react';
import Menu from "../../components/menu";
import ProductsList from '../../components/productsList';

import './products.css'

function Products(){

    return(
        <div>
            <Menu />
            <div className="productsSiteContainer">
                <h1>Escolha já o seu </h1>
                <ProductsList />
            </div>
        </div>
    );
}

export default Products;