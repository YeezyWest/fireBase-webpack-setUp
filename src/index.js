import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBZAidQLhE_kW5s3jMh_3s8utXQM0hW5ds",
    authDomain: "new-project-2243a.firebaseapp.com",
    projectId: "new-project-2243a",
    storageBucket: "new-project-2243a.appspot.com",
    messagingSenderId: "140653278468",
    appId: "1:140653278468:web:0cede46050474a358e0c51"
};

//init firebase app
const app = initializeApp(firebaseConfig)


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


        //adding documents
        const addBookForm = document.querySelector('.add');

        console.log(addBookForm)

        addBookForm.addEventListener('submit', (e) => {
            e.preventDefault()

            addDoc(colRef, {
                title: addBookForm.title.value,
                author: addBookForm.author.value,
            })
                .then(() => {
                    addBookForm.reset()
                })

        });

        //deleting documents
        const deleteBookForm = document.querySelector('.delete');
        deleteBookForm.addEventListener('submit', (e) => {
            e.preventDefault();


        });

    });

