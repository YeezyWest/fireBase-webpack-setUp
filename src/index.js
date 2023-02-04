import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, snapshot
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBaYwyK_KvdPycg5f5wRAwHR43h6toVvMc",
    authDomain: "fir-9-mrwest.firebaseapp.com",
    projectId: "fir-9-mrwest",
    storageBucket: "fir-9-mrwest.appspot.com",
    messagingSenderId: "579672864947",
    appId: "1:579672864947:web:2686db9a3ce03ab27958c6"
}

//init firebase app
initializeApp(firebaseConfig)


//init services
const db = getFirestore()


//collection ref
const colRef = collection(db, 'books')


//get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })

        console.log(books)
    })
    .catch((err) => {
        console.log(err.message)
    });
