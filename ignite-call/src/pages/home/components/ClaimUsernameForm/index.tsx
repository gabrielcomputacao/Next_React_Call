import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Tamanho inválido" })
    .regex(/^([a-z\\-]+)$/i, { message: "Não pode ter caracter especial" })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data.username);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          crossOrigin=""
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register("username")}
        ></TextInput>
        <Button type="submit" size="sm">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text>
          {errors.username ? errors.username.message : "Digite o nome desejado"}
        </Text>
      </FormAnnotation>
    </>
  );
}
