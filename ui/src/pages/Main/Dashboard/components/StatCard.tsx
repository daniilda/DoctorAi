import { cardNoPadding } from "../../Report/tailwind";
import useRating from "@/utils/useRating";
import OkBg from "../assets/spiral_ok.svg";
import BadBg from "../assets/spiral_bad.svg";
import WarningBg from "../assets/spiral_warning.svg";
import LoadingEllipsis from "@/components/LoadingEllipsis/LoadingEllipsis";

export const StatCard = ({
  progress,
  topText,
  middleText,
  bottomText,
  withGraph = false,
}: {
  progress?: number | null;
  topText: string;
  middleText?: string;
  bottomText?: string;
  withGraph?: boolean;
}) => {
  const { result, color, text } = useRating(progress);
  if (progress === null) return null;
  return (
    <div className={`${cardNoPadding} select-none min-h-[200px] relative`}>
      {typeof progress === "number" ? (
        <>
          <div
            className={`appear absolute top-10 left-0 w-full h-full bg-no-repeat bg-contain bg-center`}
          >
            {withGraph && (
              <>
                {result === "ok" ? (
                  <OkBg className="w-full" />
                ) : result === "error" ? (
                  <BadBg className="w-full mt-2" />
                ) : (
                  <WarningBg className="w-full mt-3" />
                )}
              </>
            )}
          </div>
          <div className="relative flex flex-col p-4">
            <h3 className="text-lg">{topText}</h3>
            <h2 className="text-2xl font-bold">{middleText}</h2>
            <h1 className="font-bold text-5xl mt-auto pt-2">{progress}%</h1>
            <p className={`font-medium`} style={{ color }}>
              {bottomText ?? text}
            </p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingEllipsis />
        </div>
      )}
    </div>
  );
};
