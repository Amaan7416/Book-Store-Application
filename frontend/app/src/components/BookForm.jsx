import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publisherYear: ''
  });

  // Get book by ID
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/books/${id}`)
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  // Add / Update book
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update book
      axios
        .put(`http://localhost:5000/books/${id}`, book)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Add new book
      axios
        .post('http://localhost:5000/books', book)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h2 className="mb-4">
        {id ? 'Update Book' : 'Add New Book'}
      </h2>

      <Form onSubmit={handleSubmit}>

        {/* Title */}
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </Form.Group>

        {/* Author */}
        <Form.Group controlId="author" className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={book.description}
            onChange={handleChange}
            placeholder="Enter book description"
            required
          />
        </Form.Group>

        {/* Publisher Year */}
        <Form.Group controlId="publisherYear" className="mb-3">
          <Form.Label>Publisher Year</Form.Label>
          <Form.Control
            type="number"
            name="publisherYear"
            value={book.publisherYear}
            onChange={handleChange}
            placeholder="Enter publisher year"
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
        >
          {id ? 'Update Book' : 'Add Book'}
        </Button>

      </Form>
    </>
  );
}

export default BookForm;