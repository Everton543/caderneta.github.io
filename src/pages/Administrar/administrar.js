import { React, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as model from "../../service/model";
import Menu from "../../components/menu";
import UpdateProduct from "../../components/updateProduct";
import InputMask from 'react-input-mask';

import "./administrar.css";
import '../../index.css';


const auth = getAuth();
var currentUrl = window.location.href.toLowerCase();
if(currentUrl.includes("administrar")){
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

  } else {
    window.location.replace("/#/");
  }
});
}

function Administrar(){
  const [studentInputs, setStudentInputs] = useState({});
  const [studentList, setStudentList] = useState([]);
  const [schoolClassLIst, setSchoolClassList] = useState({});

  useEffect(()=>{
    model.getAllStudents(setStudentList);
  }, []);

  
  const handleProductChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setStudentInputs(values => ({...values, [name]: value}));
    console.log(studentInputs);
  }

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    model.saveProduct(studentInputs);
    model.getAllStudents(setStudentInputs);
  }
  

  return (
    <div>
      <Menu />
    <div className="adminContainer">
      <h1> Secretaria </h1>

      <div>
        <h2> Cadastrar Alunos</h2>
        <button value="saveStudentsHolder" onClick={ v => model.openOrHide(v.target.value)}>
          Esconder/Mostrar Cadastrar Produtos
        </button>
        <div id="saveStudentsHolder">
          <div>
              <label>Nome do aluno: <br />
                <input 
                  type="text" 
                  name="name" 
                  value={studentInputs.name || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Nome do pai: <br />
                <textarea 
                  name="fatherName" 
                  value={studentInputs.fatherName || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Nome da mãe: <br />
                <textarea 
                  name="motherName" 
                  value={studentInputs.motherName || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>CPF: <br />
              <InputMask mask="999.999.999-99"
                value={studentInputs.cpf || ""}
                name="cpf"
                onChange={handleProductChange}/>
              </label>
            </div>

            <div>
              <label>RG: <br />
              <InputMask mask="9.999.999"
                value={studentInputs.rg || ""}
                name="rg"
                onChange={handleProductChange}/>
              </label>
            </div>

            <div>
              <label>Data de nascimento: <br />
              <InputMask mask="99/99/9999"
                value={studentInputs.dateOfBirth}
                name="dateOfBirth"
                onChange={handleProductChange}/>
              </label>
            </div>

            <div>
              <label>Endereço: <br />
                <textarea 
                  name="address" 
                  value={studentInputs.address || ""} 
                  onChange={handleProductChange}
                />
              </label>
            </div>

            <div>
              <label>Celular: <br />
              <InputMask mask="(99) 9 9999-9999"
                value={studentInputs.phone}
                name="phone"
                onChange={handleProductChange}/>
                </label>
            </div>

            <div>
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

            <div>
              <button onClick={handleSubmitProduct}> Cadastrar Aluno </button>
            </div>
        </div>

        <h2>Editar Alunos</h2>
        <button value="updateProductsHolder" onClick={ v => model.openOrHide(v.target.value)}>
          Esconder/Mostrar Editar Alunos
        </button>
        <div className="updateProductsHolder" id="updateProductsHolder">
          {studentList.map((product, index) => <UpdateProduct key={index} product={product}/>)}
        </div>
      </div>
    </div>
    </div>
    );
}
export default Administrar;