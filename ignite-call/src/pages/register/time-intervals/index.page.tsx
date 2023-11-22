import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { Container, Header } from "../styles";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";
import { ArrowRight } from "phosphor-react";

export default function TimeInterval() {
  async function handleConnectCalendar() {
    await signIn("google");
  }
  const session = useSession();
  const router = useRouter();

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>Defina o intervalo de horário sque você está disponível</Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox>
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="md" type="time" step={60} crossOrigin="" />
              <TextInput size="md" type="time" step={60} crossOrigin="" />
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="md" type="time" step={60} crossOrigin="" />
              <TextInput size="md" type="time" step={60} crossOrigin="" />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button>
          Próximo Passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
