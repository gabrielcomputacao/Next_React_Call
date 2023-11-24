import { Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { getServerSession } from "next-auth";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const session = useSession();
  console.log(session);

  async function handleUpdateProfile(data: UpdateProfileData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem Vindo</Heading>
        <Text>Precisamos de algumas informações sobre você</Text>

        <MultiStep size={4} currentStep={1} />

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de Perfil</Text>
          </label>
          <label>
            <Text size="sm">Sobre Você</Text>
            <TextArea {...register("bio")} />
            <FormAnnotation size="sm">Fale um pouco sobre você.</FormAnnotation>
          </label>

          <Button disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Header>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session: session,
    },
  };
};
