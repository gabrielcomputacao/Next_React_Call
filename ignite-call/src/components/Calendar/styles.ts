import { Text, styled } from "@ignite-ui/react";

export const CalendarContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",
  padding: "$6",
});
export const CalendarHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const CalendarTitle = styled(Text, {
  fontWeight: "$medium",
  textTransform: "capitalize",

  span: {
    color: "$gray200",
  },
});
export const CalendarActions = styled("div", {
  display: "flex",
  gap: "$2",
  color: "$gray200",

  button: {
    /* tira todos os estilos padroes de uma vez*/
    all: "unset",
    cursor: "pointer",
    lineHeight: 0,
    borderRadius: "$sm",

    svg: {
      width: "$5",
      height: "$5",
    },

    "&:hover": {
      colors: "$gray100",
    },
    "&:focus": {
      boxShadow: "0 0 0 2px $colors$gray100",
    },
  },
});
export const CalendarBody = styled("table", {
  width: "100%",
  fontFamily: "$default",
  borderSpacing: "0.25rem",
  /* algoritmo usado para calcular as celulas da table, com o fixed aumentando ou diminuindo todas vao ter o mesmo valor*/
  tableLayout: "fixed",

  "thead th": {
    color: "$gray200",
    fontWeight: "$medium",
    fontSize: "$sm",

    "tbody:before": {
      content: ".",
      lineHeight: "0.75rem",
      display: "block",
      color: "$gray800",
    },
    "tbody td": {
      boxSizing: "border-box",
    },
  },
});
export const CalendarDay = styled("button", {
  all: "unset",
  width: "100%",
  /* obriga o componente a ter a mesma altura e mesma largura, assim depende de como o usuario aumenta ou diminui a tela ele sempre ira manter o padrão */
  aspectRatio: "1/1",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: "$sm",
  background: "$gray600",

  "&:disabled": {
    background: "none",
    cursor: "default",
    opacity: "0.4",
  },
  "&:focus": {
    boxShadow: "0 0 0 2px $colors$gray100",
  },
  "&:hover": {
    background: "$gray500",
  },
});
