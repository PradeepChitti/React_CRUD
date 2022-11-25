import { useState } from "react";
import "./App.css";
import AddBook from "./App/Components/AddBook";
import BooksList from "./App/Components/BooksList";

function App() {
  const [bookId, setBookId] = useState("");
  const getBookIdHandler = (id) => {
    // console.log("id ============================== ", id);
    setBookId(id);
  };
  return (
    <div className="App">
      <header className="App-header">Book App</header>
      <AddBook id={bookId} setBookId={setBookId} />
      <BooksList getBookId={getBookIdHandler} />
    </div>
  );
}

export default App;
