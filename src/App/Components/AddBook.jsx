import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Alert from "react-bootstrap/Alert";

import BookServices from "../Services/BookServices";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("not available");

  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  const radios = [
    { name: "Not Available", value: "not available" },
    { name: "Available", value: "available" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    // If no fields are empty, proceed further otherwise function ends here.
    if (title === "" || author === "") {
      setErrorMessage({ error: true, message: "All Fields are Mandatory!" });
      return;
    }
    const newBook = {
      title,
      author,
      status,
    };
    // adding 'newBook' to the firebase/firestore collection.
    try {
      if (id !== undefined && id !== "") {
        try {
          await BookServices.updateBook(id, newBook);
          setBookId("");
          setErrorMessage({
            error: false,
            message: "Updated successfylly !",
          });
        } catch (err) {
          setErrorMessage({ error: true, message: err.message });
        }
      } else {
        await BookServices.addBook(newBook);
        setErrorMessage({
          error: false,
          message: "New Book Added Successfully !",
        });
      }
    } catch (err) {
      setErrorMessage({ error: true, message: err.message });
    }
    setTitle("");
    setAuthor("");
  };
  const editHandler = async () => {
    setErrorMessage("");
    try {
      const bookToBeEdited = await BookServices.getABook(id);
      setTitle(bookToBeEdited.data().title);
      setAuthor(bookToBeEdited.data().author);
      setStatus(bookToBeEdited.data().status);
    } catch (error) {
      setErrorMessage({ error: true, message: error.message });
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="alerts-container">
        {errorMessage.message && (
          <Alert
            variant={errorMessage.error ? "danger" : "success"}
            dismissible
            onClose={() => setErrorMessage("")}
          >
            {errorMessage?.message}
          </Alert>
        )}
      </div>
      <form action="#" className="form-container" onSubmit={handleSubmit}>
        <div className="form-input-container">
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          {/* {radios.map((radio) => {
          return (
            <>
              <input
                type="radio"
                name={radio.name}
                value={radio.value}
                checked={status === radio.value}
                onChange={(e) => {
                  setStatus(e.currentTarget.value);
                }}
              />
              <label htmlFor={radio.name}>{radio.name}</label>
            </>
          );
        })} */}
        </div>
        <ButtonGroup className="radio-container">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={status === radio.value}
              onChange={(e) => setStatus(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <button type="submit" className="btn btn-primary">
          Add/Update
        </button>
      </form>
    </>
  );
};

export default AddBook;
