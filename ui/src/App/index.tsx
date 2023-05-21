import Routes from "../shared/hoc/Routes";
import { ThemeStore } from "../shared/stores";
import "./base.css";
import { observer } from "mobx-react-lite";

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
