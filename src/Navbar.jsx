//import { Menu } from "semantic-ui-react";
import { Box, Link as ChakraLink, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Box bg="black" padding="0 20px">
        <Flex gap={"20"} alignItems={"center"}>
          <Image w={"40px"} src="logo.jpg"></Image>
          <Link color={"#FFF"} to={"/"}>
            Página Inicial
          </Link>
          <Spacer />
          <Link color={"#FFF"} to={"/login"}>
            Entrar/Cadastrar-se
          </Link>
        </Flex>
      </Box>
    </>
  );
}
