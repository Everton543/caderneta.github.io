import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as model from '../../service/model';

import "./index.css";

function Main(){
    const [imgs, setimgs] = useState([{ id: '', alt: '', link: '', productLink:''} ]);

    
    return (
        <div>
          <Menu />
          <div className='indexContainer'>
            <h1>Lucielma Da Conceição Corretora</h1>
          </div>
        </div>
    );
}

export default Main;