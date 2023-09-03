interface useRatingResult {
  text: string;
  result: "ok" | "warning" | "error" | "none";
  color: string;
  backgroundColor: string;
}

const ratingSchema = {
  compliant: {
    text: "Полное соответствие",
    result: "ok",
    color: "rgb(var(--colors-status-ok))",
    backgroundColor: "rgba(var(--colors-status-ok), 0.1)",
  },
  partial: {
    text: "Частичное соответствие",
    result: "ok",
    color: "rgb(var(--colors-status-ok))",
    backgroundColor: "rgba(var(--colors-status-ok), 0.1)",
  },
  weak: {
    text: "Слабое соответствие",
    result: "warning",
    color: "rgb(var(--colors-status-warning))",
    backgroundColor: "rgba(var(--colors-status-warning), 0.1)",
  },
  nonСompliant: {
    text: "Несоответствие",
    result: "error",
    color: "rgb(var(--colors-status-error))",
    backgroundColor: "rgba(var(--colors-status-error), 0.1)",
  },
  none: {
    text: "Стандарт отсутствует",
    result: "none",
    color: "rgb(var(--colors-secondary))",
    backgroundColor: "rgba(var(--colors-bg-primary), 0.8)",
  },
} as const;

const useRating = (rating?: number | null): useRatingResult => {
  if (!rating) return ratingSchema.none;
  if (rating === 100) return ratingSchema.compliant;
  if (rating >= 90) return ratingSchema.partial;
  if (rating > 60) return ratingSchema.weak;
  if (rating >= 0) return ratingSchema.nonСompliant;
  return ratingSchema.none;
};

export default useRating;
