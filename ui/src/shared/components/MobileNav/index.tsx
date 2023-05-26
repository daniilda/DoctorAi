import { Link, useLocation } from "react-router-dom";
import ReportNewSvg from "./assets/report_new.svg";
import ReportsSvg from "./assets/reports.svg";
import AuthStore from "@/stores/authStore";
import { observer } from "mobx-react-lite";

const MobileNav = observer(() => {
  const { pathname } = useLocation();
  if (AuthStore.authState !== "authorized") {
    return <></>;
  }
  return (
    <>
      <div className="fixed left-0 border-t-text-placeholder/30 border-t-[1px] bottom-0 right-0 h-16 bg-bg-nav/70 backdrop-blur-md flex">
        <Link
          to="/upload"
          className={`flex items-center justify-center gap-2 flex-1 ${
            pathname.includes("/upload") ? "text-primary" : ""
          }
          )}`}
        >
          <ReportNewSvg width={28} />
          <span className="font-medium">Новый отчёт</span>
        </Link>
        <span className="h-full py-[5px] w-[1px] bg-text-placeholder/30"></span>
        <Link
          to="/report/1"
          className={`flex items-center justify-center gap-2 flex-1 ${
            pathname.includes("/report/") ? "text-primary" : ""
          }
          )}`}
        >
          <ReportsSvg width={28} />
          <span className="font-medium">Все отчёты</span>
        </Link>
      </div>
      {/* measurer */}
      <div className="h-16"></div>
    </>
  );
});

export default MobileNav;
