import React, { useState, useEffect } from 'react';
import * as model from '../service/model';
import ProductsListItem from './productsListItem';

function ProductsList(){
    const [products, setProducts] = useState([{        
        name : "",
        shortDescription : "",
        longDescription : "",
        usefulArea : "",
        grossArea : "",
        landArea : "",
        type :"",
        address : "",
        price : "",
        mapLink : "",
        saleOrRent : "",
        imagesLink : "",
        imagesLink: [
            "VAZIO"
        ],
        id : "",
        isOnCarousel : ""
    }]);

    useEffect(()=>{
      model.getAllStudents(setProducts);
    }, []);

    return(
    <div>
        <div className="productsListContainer">{products.map((product, index) => <ProductsListItem key={index} product={product}/>)}</div>
    </div>
    )
}

export default ProductsList;