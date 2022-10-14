import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

import { Input } from "../../components/Form";
import { Sidebar } from "../../components/Sidebar";
import Header from "../../components/Header";

// import { api } from '../../services/api';
// import { queryClient } from '../../services/queryClient';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("You must add a name"),
  email: yup.string().email("Invalid E-mail").required("E-mail required"),
  password: yup
    .string()
    .min(6, "At least 6 characters required")
    .required("You must add a password"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Both passwords should match"),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = () => {};

  const { register, handleSubmit, formState, reset } =
    useForm<CreateUserFormData>({
      resolver: yupResolver(createUserFormSchema),
    });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // reset();
    // router.push('/users');
    console.log(values)
  };

  return (
    <Box>
      <Header />

      <Flex
        width="100%"
        maxWidth={1480}
        marginY="6"
        marginX="auto"
        paddingX="6"
      >
        <Sidebar />

        <Box
          flex="1"
          borderRadius="8"
          bg="gray.800"
          padding={["6", "8"]}
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="name"
                label="Nome completo"
                error={formState.errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={formState.errors.email}
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={formState.errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
