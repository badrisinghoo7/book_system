import React, { useState } from "react";
import { Box, Heading, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };

    fetch("https://bookbackend-45nr.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        console.log("token", localStorage.getItem("token"));
        console.log("role", localStorage.getItem("role"));

        window.location.href = "/books";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>Login with Credentials</Heading>
      <Input
        type="text"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Input
        type="password"
        value={password}
        placeholder="Enter password"
        onChange={(e) => setPass(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
