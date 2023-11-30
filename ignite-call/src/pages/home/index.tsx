import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import Image from "next/image";
import previewImage from "../../assets/app_preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo title="Agenda Suas reuniões" description="Agora é a hora." />

      <Container>
        <Hero>
          <Heading size="4xl">Agendamento Descomplicado</Heading>
          <Text size="lg">
            Conecte seu calendario e permita que as pessoas marquem agendamentos
            no seu tempo.
          </Text>

          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário imitando a aplicação"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  );
}
