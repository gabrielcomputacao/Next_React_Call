import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: "minimo 3 caracteres" }),
  email: z.string().email({ message: "digite um email válido" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  function handleConfirmSchedule(data: ConfirmFormData) {}

  const describeDate = dayjs(schedulingDate).format("DD[ de ]YYYY");
  const describeTime = dayjs(schedulingDate).format("HH:mm[h]");

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>
        <Text>
          <Clock />
          {describeTime}
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome Completo</Text>
        <TextInput
          crossOrigin=""
          placeholder="seu nome"
          {...register("name")}
        />

        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          crossOrigin=""
          {...register("email")}
          placeholder="gabriel@hotmail"
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label htmlFor="">
        <Text size="sm">Observaçoes</Text>
        <TextArea {...register("observations")} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          disabled={isSubmitting}
          onClick={onCancelConfirmation}
        >
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}
