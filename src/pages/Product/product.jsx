import React from "react";
import Menu from "../../components/menu";
import * as model from '../../service/model';
import {useParams} from "react-router-dom";

import './product.css'

function Product(){
    const id = useParams().id;

    return(
        <div>
            <Menu />
            <div className="productSiteContainer">
                <h1>{id}</h1>
            </div>
        </div>
    );
}

export default Product;