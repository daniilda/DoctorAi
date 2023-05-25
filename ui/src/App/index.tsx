import Routes from "../shared/hoc/Routes";
import "./base.css";
import "./transitions.scss";
import { observer } from "mobx-react-lite";
import { ThemeStore } from "@/stores/themeStore";

const App = observer(() => {
  return (
    <div
      className={`${ThemeStore.theme} items-center text-text-main bg-bg-primary w-full min-h-full flex flex-col overflow-x-hidden`}
    >
      <Routes />
    </div>
  );
});

export default App;
