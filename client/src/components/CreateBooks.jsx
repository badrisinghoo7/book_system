import React, { useState } from "react";
import { Box, Heading, Input, Textarea, Button } from "@chakra-ui/react";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = () => {
    const userRole = localStorage.getItem("role");
    console.log(userRole);

    if (userRole === "CREATOR") {
      const payload = {
        title,
        body,
      };

      fetch("https://bookbackend-45nr.onrender.com/books/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      console.log("You don't have permission to create books.");
      // You can show a notification or take other actions based on your requirements.
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>Create with Credentials</Heading>
      <Input
        type="text"
        value={title}
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />
      <Textarea
        value={body}
        placeholder="Enter description"
        onChange={(e) => setBody(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleCreate}>
        Create Notes
      </Button>
    </Box>
  );
};

export default CreateBook;
