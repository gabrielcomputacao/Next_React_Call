import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  async function handleRegister() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Connecte sua agenda</Heading>
        <Text>
          Conecte sua agenda do google para entrar no sistema e ter todas opções
          disponíveis
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text> Google Calendar</Text>
          <Button variant="secondary" size="md">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button>
          Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
