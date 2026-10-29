import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function BookList() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get('https://book-store-application-lu9b.onrender.com/books').then(response => setBooks(response.data)).catch
            (error => console.log(error))
    }, []);

    const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await axios.delete(
      `https://book-store-application-1-i39k.onrender.com/books/${id}`
    );

    setBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== id)
    );

  } catch (error) {
    console.error("Delete Error:", error);

    alert("Book delete nahi hui. Please try again.");
  }
};



    return (
        <>
            <div>
                <Link to="/add" className='="btn btn-primary mb-3'>Add New Book</Link>
                <Table Striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Publisher Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>{book.publisherYear}</td>
                                <td>
                                    <Link to={`/edit/${book._id}`} className='btn btn-warning mr-2'>Edit</Link>
                                    <Button variant='danger' onClick={() => handleDelete(book._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>

    )
}

export default BookList