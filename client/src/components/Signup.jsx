import React, { useState } from "react";
import { Box, Heading, Input, Button, Alert, AlertIcon, Select } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("VIEW_ALL"); // Default role

  const [error, setError] = useState("");

  const apiUrl = "https://bookbackend-45nr.onrender.com";
  const navigate = useNavigate();

  const handleSubmit = () => {
    let user = {
      name,
      email,
      password,
      role,
    };

    axios
      .post(`${apiUrl}/users/register`, user)
      .then((res) => {
        console.log(res);
        alert("Registration Successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>User Registration</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={4}
      />
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={4}
      />
      <Select value={role} onChange={(e) => setRole(e.target.value)} mb={4}>
        <option value="VIEW_ALL">VIEW_ALL</option>
        <option value="CREATOR">CREATOR</option>
      </Select>
      <Button colorScheme="blue" onClick={handleSubmit}>
        SignUp
      </Button>
    </Box>
  );
};

export default Signup;
