interface useRatingResult {
  text: string;
  result: "ok" | "warning" | "error" | "none";
  color: string;
  backgroundColor: string;
}

const useRating = (rating?: number): useRatingResult => {
  if (!rating)
    return {
      text: "Стандарт отсутствует",
      result: "none",
      color: "rgb(var(--colors-secondary))",
      backgroundColor: "rgba(var(--colors-bg-primary), 0.8)",
    };
  if (rating === 100) {
    return {
      text: "Полное соответствие",
      result: "ok",
      color: "rgb(var(--colors-status-ok))",
      backgroundColor: "rgba(var(--colors-status-ok), 0.1)",
    };
  }
  if (rating >= 90)
    return {
      text: "Частичное соответствие",
      result: "ok",
      color: "rgb(var(--colors-status-ok))",
      backgroundColor: "rgba(var(--colors-status-ok), 0.1)",
    };
  if (rating > 60)
    return {
      text: "Слабое соответствие",
      result: "warning",
      color: "rgb(var(--colors-status-warning))",
      backgroundColor: "rgba(var(--colors-status-warning), 0.1)",
    };
  if (rating > 0)
    return {
      text: "Несоответствие",
      result: "error",
      color: "rgb(var(--colors-status-error))",
      backgroundColor: "rgba(var(--colors-status-error), 0.1)",
    };
  return {
    text: "Стандарт отсутствует",
    result: "none",
    color: "rgb(var(--colors-secondary))",
    backgroundColor: "rgba(var(--colors-bg-primary), 0.8)",
  };
};

export default useRating;
