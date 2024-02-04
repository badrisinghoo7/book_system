import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Spacer, Link as ChakraLink } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box p={4} bg="blue.500">
      <Flex align="right">
        <Spacer />

        <Link to={"/register"}>
          <ChakraLink color="white" mr={4}>
            Register
          </ChakraLink>
        </Link>
        <Spacer />

        <Link to={"/login"}>
          <ChakraLink color="white" mr={4}>
            Login
          </ChakraLink>
        </Link>
        <Spacer />

        <Link to={"/create"}>
          <ChakraLink color="white" mr={4}>
            Create
          </ChakraLink>
        </Link>
        <Spacer />

        <Link to={"/books"}>
          <ChakraLink color="white">
            Books
          </ChakraLink>
        </Link>
        <Spacer />
        {/* Add more navigation links or components here */}
      </Flex>
    </Box>
  );
};

export default Navbar;
