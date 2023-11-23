import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { Container, Header } from "../styles";

import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
  FormErrorTime,
} from "./styles";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";
import { api } from "@/lib/axios";

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Precisa selecionar pelo menos um dia.",
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        };
      });
    })
    .refine(
      (intervals) => {
        /* verifica se todos do array cumprem a regra de validação */
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        );
      },
      {
        message:
          "O horário deve ser pelo menos de uma hora de diferença do início.",
      }
    ),
});

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.input<typeof timeIntervalsFormSchema>;

export default function TimeInterval() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput, any, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const { fields } = useFieldArray({
    name: "intervals",
    control,
  });

  const intervals = watch("intervals");

  async function handleSetTimeIntervals(data: TimeIntervalsFormOutput) {
    const { intervals } = data;

    await api.post("users/time-intervals", {
      intervals,
    });
  }

  const weekDays = getWeekDays();

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>Defina o intervalo de horário sque você está disponível</Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        checked={field.value}
                      />
                    );
                  }}
                />
                <Text> {weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="md"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                  crossOrigin=""
                  disabled={intervals[index].enabled === false}
                />
                <TextInput
                  size="md"
                  type="time"
                  step={60}
                  crossOrigin=""
                  {...register(`intervals.${index}.endTime`)}
                  disabled={intervals[index].enabled === false}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>
        {errors.intervals && (
          <FormErrorTime size="md">
            {errors.intervals.root?.message}
          </FormErrorTime>
        )}
        <Button disabled={isSubmitting}>
          Próximo Passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
