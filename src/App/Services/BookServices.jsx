import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

// Reference to the books collection in firebase.
const bookCollectionRef = collection(db, "books");

class BookDataService {
  // adding new book
  addBook = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };
  // updating a book
  updateBook = (id, updatedBook) => {
    // fetching the id of the book from db collection
    const bookInDB = doc(db, "books", id);
    return updateDoc(bookInDB, updatedBook);
  };
  // delete a book
  deleteBook = (id) => {
    // fetching the id of the book from db collection
    const bookInDB = doc(db, "books", id);
    return deleteDoc(bookInDB);
  };
  // fetch all the books in DB
  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };
  // fetch a specific book
  getABook = (id) => {
    const bookInDB = doc(db, "books", id);
    return getDoc(bookInDB);
  };
}

export default new BookDataService();
