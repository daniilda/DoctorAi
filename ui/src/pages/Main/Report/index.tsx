import { useViewModel } from "@/utils/useViewModel";
import { useParams } from "react-router-dom";
import { ReportStore } from "./report.vm";
import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import cl from "./styles.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const cardClasses =
  "bg-bg-accent p-8 rounded-xl shadow-sm flex w-full overflow-hidden hover:shadow-md cursor-pointer transition-shadow";

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
    <div className={`${cardClasses} ${cl.card}`} onClick={onClick}>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl text-text-secondary">{role}</h3>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div
          className={`flex flex-wrap items-center self-start gap-3 mt-auto ${ratingTextColor}`}
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

const Report = observer(() => {
  const { id } = useParams();
  const vm = useViewModel(() => new ReportStore(id ?? ""));
  return (
    <div className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-6 lg:mt-8 gap-3 appear">
      <SwitchTransition>
        {vm.selectedDoctor === null ? (
          <CSSTransition
            key="report"
            timeout={300}
            classNames="slide-left"
            unmountOnExit
          >
            <div className="grid lg:grid-cols-2 gap-3">
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
          </CSSTransition>
        ) : (
          <CSSTransition
            key="doctor"
            timeout={300}
            classNames="slide-right"
            unmountOnExit
          >
            <div className="flex flex-col gap-3">
              Testing
              <button
                className="bg-bg-accent p-4 rounded-xl shadow-sm flex w-full overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => (vm.selectedDoctor = null)}
              >
                back
              </button>
            </div>
          </CSSTransition>
        )}
      </SwitchTransition>
    </div>
  );
});

export default Report;
