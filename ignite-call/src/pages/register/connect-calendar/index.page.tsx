import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ConnectCalendar() {
  async function handleConnectCalendar() {
    await signIn("google");
  }

  async function handleNavigateNextStep() {
    await router.push("/register/time-intervals");
  }

  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

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
          {isSignedIn ? (
            <Button disabled size="sm">
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Verifique as permissoes da aplicação para acessar o google calendar
          </AuthError>
        )}

        <Button onClick={handleNavigateNextStep} disabled={!isSignedIn}>
          Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
