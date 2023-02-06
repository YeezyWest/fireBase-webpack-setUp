import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'



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
const auth = getAuth()


//collection ref
const colRef = collection(db, 'books')

//query collection
const q = query(colRef, orderBy('createdAt'))

//qureies
const unsubCol = onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})


//real time collection data
// onSnapshot(colRef, (snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
// })


//adding documents
const addBookForm = document.querySelector('.add');

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset()
        })

});


//deleting documents
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })

});


//get a single document

const docRef = doc(db, 'books', 'n9FqbQp7NhWhNEnUsrIx')

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//updating a document

const updateForm = document.querySelector('.update');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);

    updateDoc(docRef, {
        title: 'updated title'
    })
        .then(() => {
            updateForm.reset();
        });
});

//signing users up
const signUpForm = document.querySelector('.signup')
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //  console.log('user created:', cred.user);
            signUpForm.reset()
        })
        .catch((err) => {
            console.log(err.message);
        })

})



//logging in  and out
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            //  console.log('logged out');
        })
        .catch((err) => {
            console.log(err.message)
        });

});

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value
    const password = loginForm.password.value


    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //  console.log('User login successful:' , cred.user)
        })
        .catch((err) => {
            console.log(err.message)
        });

});


//subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user);
})


//unsubscribing from auth changes (auth & db)
const unsubButton = document.querySelector('.unsub');
unsubButton.addEventListener('click', () => {
    console.log('user unsubscribed')
    // unsubCol()
    // unsubDoc()
    // unsubAuth()
});