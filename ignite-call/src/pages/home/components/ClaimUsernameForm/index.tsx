import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const claimUsernameFormSchema = z.object({
  username: z.string(),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data.username);
  }

  return (
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
  );
}
