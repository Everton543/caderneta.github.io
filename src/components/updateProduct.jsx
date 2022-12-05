import { React, useState } from "react";
import * as model from "../service/model";
import InputMask from 'react-input-mask';

import "./updateProduct.css";
function UpdateProduct({product}){
    const [studentInfo, setStudentInfo] = useState(product);

    const handleProductChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setStudentInfo(values => ({...values, [name]: value}))
    }

    const handleSubmitProduct = (event) => {
        event.preventDefault();
        model.updateProduct(studentInfo);
    }

    const handleDeleteProduct = (event) => {
        event.preventDefault();
        model.deleteProduct(studentInfo);
    }

    return(
        <div className="updateProductContainer">
            <div className="updateProductElement">
              <label>Nome do aluno: <br />
                <input 
                  type="text" 
                  name="name" 
                  value={studentInfo.name || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div className="updateProductElement">
              <label>Nome do pai: <br />
                <textarea 
                  name="fatherName" 
                  value={studentInfo.fatherName || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div className="updateProductElement">
              <label>Nome da mãe: <br />
                <textarea 
                  name="motherName" 
                  value={studentInfo.motherName || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div className="updateProductElement">
              <label>CPF: <br />
                <InputMask mask="999.999.999-99"
                  value={studentInfo.cpf || ""} 
                  name="cpf" 
                  onChange={handleProductChange}/>
              </label>
            </div>

            <div className="updateProductElement">
              <label>RG: <br />
              <InputMask mask="9.999.999" 
                value={studentInfo.rg || ""} 
                name="rg" 
                onChange={handleProductChange}
                />
              </label>
            </div>

            <div className="updateProductElement">
              <label>Data de nascimento: <br />
              <InputMask mask="99/99/9999"
                  value={studentInfo.dateOfBirth} 
                  name="dateOfBirth" 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div className="updateProductElement">
              <label>Endereço: <br />
                <textarea 
                  name="address" 
                  value={studentInfo.address || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div className="updateProductElement">
              <label>Celular: <br />
              <InputMask mask="(99) 9 9999-9999"
                value={studentInfo.phone || ""}
                name="phone"
                onChange={handleProductChange}/>
                </label>
            </div>

            <div className="updateProductElement">
              <label> Sala de Aula: <br />
              <select name="classID"
                onChange={handleProductChange}
              > 
                <option value="">Escolha</option>
                <option value="1a">1º A</option>
                <option value="1b">1º B</option>
                <option value="1c">1º C</option>
                <option value="1d">1º D</option>
              </select>                
              </label>
            </div>
            
            <div className="updateProductElement">
                <button onClick={handleSubmitProduct}> Atualizar Aluno</button>
            </div>

            <div className="updateProductElement">
                <button onClick={handleDeleteProduct}> RETIRAR ALUNO</button>
            </div>
        </div>
    );
}

export default UpdateProduct;