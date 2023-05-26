import ChevronSvg from "@/assets/chevron.svg";
import SearchSvg from "@/assets/search.svg";
import { Button, Dropdown, Input } from "@/components/ui";
import cl from "./styles.module.scss";
import { card, cardWithHover } from "./tailwind";
import { observer } from "mobx-react-lite";
import { ReportStore, SortOption } from "./report.vm";
import { useState } from "react";
import toFullName from "@/utils/toFullName";
import useRating from "@/utils/useRating";
import Download from "@/components/Download";

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
  const { color, backgroundColor, text } = useRating(rating);

  return (
    <div className={`${cardWithHover} gap-1 ${cl.card}`} onClick={onClick}>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl text-text-secondary">{role}</h3>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div
          className={`flex flex-wrap-reverse items-center self-start gap-3 mt-auto`}
          style={{
            color: color,
          }}
        >
          <span
            className={`text-xl font-medium px-4 py-2 rounded-lg`}
            style={{
              backgroundColor,
            }}
          >
            {text}
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
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <div className={`lg:col-span-2 ${card} flex-wrap gap-4`}>
        <div className="flex flex-col flex-1">
          <p className="text-text-secondary text-xl">Отчёт №{vm.report?.id}</p>
          <h1 className="text-3xl font-bold">{vm.report?.reportName}</h1>
        </div>
        <Download pdf={""} docx={""} />
      </div>
      <div className="lg:col-span-2 flex flex-wrap-reverse gap-2">
        <Dropdown
          className="w-full md:flex-1"
          items={
            [
              "По алфавиту А-Я",
              "По алфавиту Я-А",
              "Сначала без соответствия",
              "Сначала с соответствием",
            ] as SortOption[]
          }
          value={vm.selectedSort}
          onChange={(v) => (vm.selectedSort = v)}
        />
        <Input
          allowClear
          placeholder="Специализация"
          value={searchValue}
          onChange={setSearchValue}
          icon={<SearchSvg className="text-text-placeholder/70" />}
          className="border-text-accent border-[1px] rounded-xl ml-auto md:flex-1 font-medium"
        />
      </div>
      {vm.report?.docMetas.map((doc, index) => (
        <DoctorCard
          key={index}
          name={toFullName(doc)}
          rating={doc.rate}
          role={doc.position}
          onClick={() => (vm.selectedDoctor = doc)}
        />
      ))}
    </div>
  );
});

export default Overview;
