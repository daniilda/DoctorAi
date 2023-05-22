import Routes from "../shared/hoc/Routes";
import "./base.css";
import { observer } from "mobx-react-lite";
import { ThemeStore } from "@/stores/themeStore";

const App = observer(() => {
  return (
    <div
      className={`${ThemeStore.theme} text-text-main bg-bg-primary w-full min-h-full flex flex-col`}
    >
      <Routes />
    </div>
  );
});

export default App;
