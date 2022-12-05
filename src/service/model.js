import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as ref_storage, getDownloadURL, uploadBytesResumable, listAll, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref as ref_database, set, get, child} from "firebase/database";
import app from "./firebase";

const  storage = getStorage(app);
const db = getDatabase(app);
const dbRef  = ref_database(db);

export class ProductFeatures{
    constructor(name, type, quantity){
        this.name = name;
        this.type = type;
        this.quantity = quantity;
    }
}

export class Student{
    constructor(name, fatherName, motherName, address, dateOfBirth, classID, cpf, rg, phone, id){
        this.name = name;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.dateOfBirth = dateOfBirth;
        this.classID = classID;
        this.cpf = cpf;
        this.rg = rg;
        this.address = address;
        this.phone = phone;
        this.id = id;
    }
}

export class ShoolClass{
    constructor(id, name, studentsIdList){
        this.id = id;
        this.name = name;
        this.studentsIdList = studentsIdList;
    }
}
export class Product{
    constructor(name, shortDescription, longDescription,
         usefulArea, grossArea, landArea, type, address,
         price, mapLink, saleOrRent, imagesLink, id, isOnCarousel){
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.usefulArea = usefulArea;
        this.grossArea = grossArea;
        this.landArea = landArea;
        this.type = type;
        this.address = address;
        this.price = price;
        this.mapLink = mapLink;
        this.saleOrRent = saleOrRent;
        this.imagesLink = imagesLink;
        this.id = id;
        this.isOnCarousel = isOnCarousel;
    }
}

export function logout(){
    const auth = getAuth();
    auth.signOut();
    window.location.replace("/");
}

export function getCarouselImages(setImages){
    get(child(dbRef, "products/")).then((snapshot) => {
        if (snapshot.exists()) {
            let result = [];
            let id = 0;
            snapshot.forEach((child)=>{
                if(child.val().isOnCarousel === "yes")
                {
                    let productLink = "/#/Product/" + child.val().id;
                    result.push({
                        id: id,
                        alt: "Carousel Image " + id,
                        link: child.val().imagesLink[0],
                        productLink: productLink
                    });
                    id++;
                }
            })
            setImages(result);
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export function saveImagesLink(id){
    let pathToFile =  "images/"+ id;
    let i = 0;
    const reference = ref_storage(storage, pathToFile);
        listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef)
                .then((url) => {
                  let referenceLink = "products/" +  id + '/imagesLink/' + i;
                  saveProductImageLink(referenceLink, url);
                  i++;
                })
            });
        }).catch((error) =>{
            console.log(error);
    }); 
}


async function deleteImagesLink(id){
    let referenceText = "products/" + id + "/imagesLink";
    set(ref_database(db, referenceText), {});    
}

async function deleteAllUpdateImages(id){
    await deleteImagesLink(id);
    let pathToFile =  "images/"+ id;
    const reference = ref_storage(storage, pathToFile);
        listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                deleteObject(itemRef).then(()=>{
                    console.log("Image deleted");
                })
                .catch((error) => {
                    console.log(error);
                })
            });
        }).catch((error) =>{
            console.log(error);
    }); 
 
}

export async function updateProductImages(product, files){
    const metadata = {
        contentType: 'image/jpeg'
    };
    await deleteAllUpdateImages(product.id);
   
    if (files.length !== 0) {
    for (let i = 0; i < files.length; i++) {
        let referenceText =  "images/"+ product.id + "/" + files[i].name;
        //create a storage reference
        var storageReference = ref_storage(storage, referenceText);

        //upload file
        var upload = uploadBytesResumable(storageReference, files[i], metadata)
        //storage.put(product.files[i]);

        //update progress bar
        upload.on(
          "state_changed",
          function progress(snapshot) {
            //var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          },

          function error() {
            console.log("error uploading file");
          },

          function complete() {
              getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                  let reference = "products/" +  product.id + '/imagesLink/' + i;
                  saveProductImageLink(reference, downloadURL);
              });
              if(i === files.length){
                  saveImagesLink(product.id);
                  alert("Fotos Atualizadas");
              }
          }
        );}

    } else {
        alert("No file chosen");
    } 
}

export function saveProductImages(product, setProgress, id){
    const metadata = {
        contentType: 'image/jpeg'
    };
      
    let progressList = [];
    if (product.files.length !== 0) {    
        //Loops through all the selected files
        for (let i = 0; i < product.files.length; i++) {
          let referenceText =  "images/"+ id + "/" + product.files[i].name;
          //create a storage reference
          var storageReference = ref_storage(storage, referenceText);
  
          //upload file
          var upload = uploadBytesResumable(storageReference, product.files[i], metadata)
          //storage.put(product.files[i]);
  
          //update progress bar
          upload.on(
            "state_changed",
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressList.push(percentage);
                setProgress(progressList);
            },
  
            function error() {
              alert("error uploading file");
            },
  
            function complete() {
                getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                    let reference = "products/" + id + '/imagesLink/' + i;
                    saveProductImageLink(reference, downloadURL);
                });
                if(i === product.files.length){
                    saveImagesLink(id);
                    alert("Fotos Salvas");
                }
            }
          );
        }
    } else {
        alert("No file chosen");
    }
}

export function saveProduct(product){
    console.log(product);
    let uid  = uuidv4();
    let productInfo;
    try{
        productInfo = new Student(
            product.name,
             product.fatherName,
             product.motherName,
             product.address,
        product.dateOfBirth,
         product.classID,
        product.cpf, 
        product.rg, 
        product.phone,
         uid);
            console.log(productInfo);
    }catch(err){
        alert("FALTOU Preencher algo");
        console.log(err);
    }

    let reference = "students/" + uid;
    set(ref_database(db, reference), productInfo).then(()=>{
        alert("Aluno Cadastrado");
    });
   
}

export function updateProduct(product){
    let reference = "students/" + product.id;
    set(ref_database(db, reference), product).then(()=>{
        alert("Produto " + product.name + " Atualizado");
    });
}

export function deleteAllImages(id){
    let pathToFile =  "images/"+ id;
    const reference = ref_storage(storage, pathToFile);
    listAll(reference)
        .then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef._location.path_);
                deleteObject(itemRef).then(()=>{
                    console.log("Image deleted");
                }).catch((error) => {
                    console.log(error);
                })
            });
        }).catch((error) =>{
            console.log(error);
    });
}

export function deleteProduct(product){
    let reference = "students/" + product.id;
    set(ref_database(db, reference), {}).then(()=>{
        alert("Estudante " + product.name + " Removido");
    });
}

function saveProductImageLink(referenceText, link){
    set(ref_database(db, referenceText), link);
}

export function hideTag(id){
    document.getElementById(id).classList.add('hide');
}
  
export function appearTag(id){
    document.getElementById(id).classList.remove('hide');
}

export function hasHide(id){
    return document.getElementById(id).classList.contains('hide');
}

export function openOrHide(id){
    console.log(id);
    if(hasHide(id)){
        appearTag(id);
        return;
    }
    hideTag(id);
}

export function getInputValue(id){
    return  document.getElementById(id).value;
}

export function getAllStudents(setStudent){
    get(child(dbRef, "students/")).then((snapshot) => {
        if (snapshot.exists()) {
            let result = [];
            console.log(snapshot.val());
            snapshot.forEach((child)=>{
                result.push(child.val());
            })
            console.log(result);
            setStudent(result);
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export default {
    logout, openOrHide, saveProductImages, getAllStudents,
    Product, ProductFeatures, getInputValue, saveProduct, getCarouselImages,
    updateProduct, deleteProduct, deleteAllImages, updateProductImages
};