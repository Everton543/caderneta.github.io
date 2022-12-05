import React from 'react';
import DisplayPicture from './displayPicture';

import "./productsList.css";
function ProductsListItem({product}){
    console.log("ID: " + product.id + " IMAGEM: " + product.imagesLink[0]);
    return(
        <div className='productListItemContainer'>
            <DisplayPicture imgLink={product.imagesLink[0]} 
                containerClassName="productListItemImageContainer"
                imgClassName="productListItemImage"
            />

            <div className='productDescription'>
                <h2>{product.name}</h2>
                <p>{product.shortDescription} </p>
            </div>
        </div>
    );
}

export default ProductsListItem;