import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";

import BookServices from "../Services/BookServices";

const BooksList = ({ getBookId }) => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookServices.getAllBooks();
    setAllBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookServices.deleteBook(id);
    getBooks();
  };

  return (
    <div className="table-container">
      <div className="refresh-btn">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => getBookId(book.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}

          {/* <tr>
            <td>2</td>
            <td>React Native</td>
            <td>Pradeep</td>
            <td>Available</td>
            <td>
              <Button variant="secondary">Edit</Button>{" "}
              <Button variant="danger">Delete</Button>
              </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
