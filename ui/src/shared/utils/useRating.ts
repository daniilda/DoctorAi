const useRating = (rating: number) => {
  console.log(rating);
  if (rating === 10)
    return ["status-ok", "status-ok/10", "Полное соответствие"];
  if (rating > 5)
    return [
      "status-warning",
      "status-warning/10",
      rating > 10 ? "Дополнительные назначения" : "Несоответствие",
    ];
  if (rating > 0 && rating <= 5)
    return ["status-error", "status-error/10", "Частичное соответствие"];
  else return ["secondary", "accent", "Стандарт отсутствует"];
};

export default useRating;
