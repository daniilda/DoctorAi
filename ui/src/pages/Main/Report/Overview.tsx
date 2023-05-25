import ChevronSvg from "@/assets/chevron.svg";
import cl from "./styles.module.scss";
import { card, cardWithHover } from "./tailwind";
import { observer } from "mobx-react-lite";
import { ReportStore } from "./report.vm";

const DoctorCard = ({
  name,
  rating,
  role,
  onClick,
}: {
  name: string;
  rating: number;
  role: string;
  onClick: () => void;
}) => {
  const [ratingTextColor, ratingBgColor, ratingText] = (() => {
    if (rating === 10)
      return ["text-status-ok", "bg-status-ok/10", "Полное соответствие"];
    if (rating > 5)
      return [
        "text-status-warning",
        "bg-status-warning/10",
        rating > 10 ? "Дополнительные назначения" : "Несоответствие",
      ];
    if (rating > 0 && rating <= 5)
      return [
        "text-status-error",
        "bg-status-error/10",
        "Частичное соответствие",
      ];
    else return ["text-text-secondary", "bg-bg-accent", "Стандарт отсутствует"];
  })();

  return (
    <div className={`${cardWithHover} ${cl.card}`} onClick={onClick}>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl text-text-secondary">{role}</h3>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div
          className={`flex flex-wrap-reverse items-center self-start gap-3 mt-auto ${ratingTextColor}`}
        >
          <span
            className={`text-xl font-medium px-4 py-2 rounded-lg ${ratingBgColor}`}
          >
            {ratingText}
          </span>
          <span className="text-xl font-medium">{rating} / 10</span>
        </div>
      </div>
      <div className="flex items-center">
        <ChevronSvg className={cl.card__chevron} />
      </div>
    </div>
  );
};

const Overview = observer(({ vm }: { vm: ReportStore }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <div className={`lg:col-span-2 ${card}`}>
        <div className="flex flex-col">
          <p className="text-text-secondary text-xl">Отчёт №{vm.report?.id}</p>
          <h1 className="text-3xl font-bold">{vm.report?.reportName}</h1>
        </div>
      </div>
      {vm.report?.docMetas.map((doc, index) => (
        <DoctorCard
          key={index}
          name={`${doc.lastName} ${doc.firstName} ${doc.middleName}`}
          rating={doc.rate}
          role={doc.position}
          onClick={() => (vm.selectedDoctor = doc)}
        />
      ))}
    </div>
  );
});

export default Overview;
