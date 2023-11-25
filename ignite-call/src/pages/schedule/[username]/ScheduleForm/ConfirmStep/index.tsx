import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";

export function ConfirmStep() {
  function handleConfirmSchedule() {}

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmSchedule}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          25 de novembro
        </Text>
        <Text>
          <Clock />
          15:00h
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome Completo</Text>
        <TextInput crossOrigin="" placeholder="seu nome" />
      </label>
      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput crossOrigin="" placeholder="gabriel@hotmail" />
      </label>
      <label htmlFor="">
        <Text size="sm">Observaçoes</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}
