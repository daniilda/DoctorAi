import ChevronSvg from "@/assets/chevron.svg";
import SearchSvg from "@/assets/search.svg";
import { Dropdown, Input } from "@/components/ui";
import cl from "./styles.module.scss";
import { card, cardWithHover } from "./tailwind";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import toFullName from "@/utils/toFullName";
import useRating from "@/utils/useRating";
import Download from "@/components/Download";
import { ReportStore, SortOption } from "@/stores/reportStore";
import OrderSvg from "./assets/order.svg";
import LoadingEllipsis from "@/components/LoadingEllipsis/LoadingEllipsis";

const DoctorCard = ({
  name,
  rating,
  role,
  onClick,
}: {
  name: string;
  rating?: number;
  role: string;
  onClick: () => void;
}) => {
  const { color, backgroundColor, text } = useRating(rating);

  return (
    <div className={`${cardWithHover} gap-1 ${cl.card}`} onClick={onClick}>
      <div className="flex flex-col flex-1 select-none">
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
          <span className="text-xl font-medium">{rating} / 100</span>
        </div>
      </div>
      <div className="flex items-center">
        <ChevronSvg className={cl.card__chevron} />
      </div>
    </div>
  );
};

const Overview = observer(() => {
  const vm = ReportStore;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    return;
  }, [vm.report?.reportDocs]);

  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <div className={`lg:col-span-2 ${card} flex-wrap gap-4 items-center`}>
        <div className="flex flex-col flex-1 gap-1">
          <h1 className="text-3xl font-bold">{vm.report?.reportName}</h1>
          <p className="text-text-secondary text-md">
            {vm.report?.createdAt &&
              new Date(vm.report?.createdAt).toLocaleString()}
          </p>
        </div>
        <Download pdf={vm.report?.pdfUrl} docx={vm.report?.docxUrl} wide />
      </div>
      <div className="lg:col-span-2 flex flex-wrap-reverse gap-2 lg:gap-3">
        <div className="flex md:flex-1 gap-1 w-full">
          <Dropdown
            className="flex-1 w-full"
            items={
              [
                "По алфавиту",
                "По соответствию",
                "По специальности",
              ] as SortOption[]
            }
            value={vm.selectedSort}
            onChange={(v) => (vm.selectedSort = v)}
          />
          <div
            className="w-[56px] h-[56px] shadow-none hover:shadow-sm transition-shadow rounded-xl border-border-main border-[1px] cursor-pointer flex justify-center items-center p-4 bg-bg-accent text-text-secondary hover:text-text-primary"
            style={{
              rotate: vm.reverseOrder ? "180deg" : "0deg",
            }}
            onClick={() => (vm.reverseOrder = !vm.reverseOrder)}
          >
            <OrderSvg />
          </div>
        </div>
        <Input
          allowClear
          placeholder="Специализация"
          value={searchValue}
          onChange={setSearchValue}
          icon={<SearchSvg className="text-text-placeholder/70" />}
          className="border-border-main border-[1px] rounded-xl ml-auto md:flex-1 font-medium"
        />
      </div>
      {vm.report === null && (
        <div className="lg:col-span-2 flex justify-center mt-4">
          <LoadingEllipsis />
        </div>
      )}
      {vm.report?.reportDocs?.length !== 0 &&
        vm.report?.reportDocs
          ?.filter((v) => {
            if (!searchValue) return true;
            return toFullName(v)
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((doc, index) => (
            <DoctorCard
              key={index}
              name={toFullName(doc)}
              rating={doc.rate}
              role={`${doc.division && doc.division}, ${doc.position}`}
              onClick={() => (vm.selectedDoctor = doc)}
            />
          ))}
    </div>
  );
});

export default Overview;
