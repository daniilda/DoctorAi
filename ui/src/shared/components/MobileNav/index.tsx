import { Link } from "react-router-dom";
import ReportNewSvg from "./assets/report_new.svg";
import ReportsSvg from "./assets/reports.svg";

const MobileNav = () => {
  return (
    <>
      <div className="fixed left-0 bottom-0 right-0 h-16 bg-bg-nav flex">
        <Link
          to="/upload"
          className="flex items-center justify-center gap-2 flex-1"
        >
          <ReportNewSvg width={28} />
          <span className="font-medium">Новый отчёт</span>
        </Link>
        <span className="h-full py-[5px] w-[1px] bg-text-placeholder/30"></span>
        <Link
          to="/reports"
          className="flex items-center justify-center gap-2 flex-1"
        >
          <ReportsSvg width={28} />
          <span className="font-medium">Все отчёты</span>
        </Link>
      </div>
      {/* measurer */}
      <div className="h-16"></div>
    </>
  );
};

export default MobileNav;
