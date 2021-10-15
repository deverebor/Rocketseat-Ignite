import React from "react";
import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text } from "@chakra-ui/react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";

export default function UserList(){
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="red"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
              Criar novo usuário
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" w="8">
                  <Checkbox colorScheme="red" />
                </Th>

                <Th>Usuário</Th>
                <Th>Data de cadastro</Th>
                <Th w="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="red" />
                </Td>

                <Td>
                  <Box>
                    <Text fontW="bold" >Lucas Souza</Text>
                    <Text fonSize="sm" color="gray.300">lucasp.sdev@gmail.com</Text>
                  </Box>
                </Td>

                <Td>
                  15 de Outubro, 2021
                </Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="teal"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                    Editar usuário
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}