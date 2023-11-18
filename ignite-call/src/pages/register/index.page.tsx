import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Tamanho inválido" })
    .regex(/^([a-z\\-]+)$/i, { message: "Não pode ter caracter especial" })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: "Tamanho inválido" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "o nome não pode ter caracter especial",
    })
    .transform((username) => username.toLowerCase()),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem Vindo</Heading>
        <Text>Precisamos de algumas informações sobre você</Text>

        <MultiStep size={4} currentStep={1} />

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome do usuário</Text>
            <TextInput
              crossOrigin=""
              prefix="ingite.com/"
              placeholder="seu-usuario"
              {...register("username")}
            />

            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Nome Completo</Text>
            <TextInput
              crossOrigin=""
              placeholder="seu nome"
              {...register("name")}
            />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button disabled={isSubmitting}>
            Próximo Passo
            <ArrowRight />
          </Button>
        </Form>
      </Header>
    </Container>
  );
}
