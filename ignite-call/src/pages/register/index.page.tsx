import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, Header } from "./styles";
import { ArrowRight } from "phosphor-react";

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem Vindo</Heading>
        <Text>Precisamos de algumas informações sobre você</Text>

        <MultiStep size={4} currentStep={1} />

        <Form as="form">
          <label>
            <Text size="sm">Nome do usuário</Text>
            <TextInput
              crossOrigin=""
              prefix="ingite.com/"
              placeholder="seu-usuario"
            />
          </label>
          <label>
            <Text size="sm">Nome Completo</Text>
            <TextInput crossOrigin="" placeholder="seu nome" />
          </label>

          <Button>
            Próximo Passo
            <ArrowRight />
          </Button>
        </Form>
      </Header>
    </Container>
  );
}
