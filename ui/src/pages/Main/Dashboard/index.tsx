import Download from "@/components/Download";

const cardNoPadding =
  "bg-bg-accent rounded-xl shadow-sm flex w-full overflow-hidden";

const card =
  "bg-bg-accent p-8 rounded-xl shadow-sm flex w-full overflow-hidden";

const cardWithHover = card + "hover:shadow-md cursor-pointer transition-shadow";

const BestDoctorCard = ({
  progress,
  title,
  name,
}: {
  progress: number;
  title: string;
  name: string;
}) => {
  return (
    <div className={`${cardNoPadding}`}>
      <h3>{}</h3>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-6 lg:mt-8 gap-3 appear pb-4">
      <div className={`${card} flex-wrap gap-4 items-center`}>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Общая статистика</h2>
        </div>
        <Download />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className={cardNoPadding}>Лучший результат соответствия</div>
        <div className={cardNoPadding}>Лучший результат соответствия</div>
        <div className={cardNoPadding}>Лучший результат соответствия</div>
      </div>
    </div>
  );
};

export default Dashboard;
