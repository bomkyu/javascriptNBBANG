// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQRIT2tpNRKu9hleY2y7XHil4qxRyFGv8",
  authDomain: "n--bbang.firebaseapp.com",
  projectId: "n--bbang",
  storageBucket: "n--bbang.appspot.com",
  messagingSenderId: "313705713464",
  appId: "1:313705713464:web:1b77174326d991ce043bcd",
  measurementId: "G-3JX3L8VV3C",
  databaseURL: "https://n--bbang-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const Insert = async  (key, value) => {
    try {
        const docRef = await addDoc(collection(db, key), value);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const Select = (key) => {
    return new Promise((resolve, reject) => {
      getDocs(collection(db, key))
        .then((querySnapshot) => {
          const result = [];
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          resolve(result);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          reject(error);
        });
    });
  };

export const Delete = async  () => {
    try {
        const docRef = await addDoc(collection(db, "User"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const Update = async  () => {
    try {
        const docRef = await addDoc(collection(db, "User"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


