interface useRatingResult {
  textColor: string;
  bgColor: string;
  text: string;
  result: "ok" | "warning" | "error" | "none";
  color: string;
}

const useRating = (rating?: number): useRatingResult => {
  if (!rating)
    return {
      textColor: "secondary",
      bgColor: "accent",
      text: "Стандарт отсутствует",
      result: "none",
      color: "rgb(var(--colors-secondary))",
    };
  if (rating > 0 && rating <= 5)
    return {
      textColor: "status-error",
      bgColor: "status-error/10",
      text: "Несоответствие",
      result: "error",
      color: "rgb(var(--colors-status-error))",
    };
  if (rating === 10) {
    return {
      textColor: "status-ok",
      bgColor: "status-ok/10",
      text: "Полное соответствие",
      result: "ok",
      color: "rgb(var(--colors-status-ok))",
    };
  }
  if (rating >= 8 && rating < 10)
    return {
      textColor: "status-ok",
      bgColor: "status-ok/10",
      text: "Частичное соответствие",
      result: "ok",
      color: "rgb(var(--colors-status-ok))",
    };
  if (rating > 5)
    return {
      textColor: "status-warning",
      bgColor: "status-warning/10",
      text: rating > 10 ? "Дополнительные назначения" : "Несоответствие",
      result: "warning",
      color: "rgb(var(--colors-status-warning))",
    };
  return {
    textColor: "secondary",
    bgColor: "accent",
    text: "Стандарт отсутствует",
    result: "none",
    color: "rgb(var(--colors-secondary))",
  };
};

export default useRating;
