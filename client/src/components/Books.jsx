import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Books = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://bookbackend-45nr.onrender.com/books/", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const userRole = localStorage.getItem("role"); // Replace this with actual user role from your authentication system

  const handleDelete = (bookId) => {
    // Implement your delete logic here
    fetch(`https://bookbackend-45nr.onrender.com/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
        // Add any additional logic here after successful deletion
      })
      .catch((err) => console.log(err));
    console.log(`Deleting book with ID: ${bookId}`);
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>Book List</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Genre</Th>
            {userRole === "CREATOR" && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((book) => (
            <Tr key={book._id}>
              <Td>{book.title}</Td>
              <Td>{book.author}</Td>
              <Td>{book.genre}</Td>
              {userRole === "CREATOR" && (
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Books;
