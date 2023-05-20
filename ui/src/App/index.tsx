import Routes from "../shared/components/Routes";
import { ThemeStore } from "../shared/stores";
import "./base.css";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  console.log(ThemeStore.theme);
  return (
    <main
      className={`${ThemeStore.theme} text-text-main bg-bg-primary w-full min-h-full flex flex-col`}
    >
      <Routes />
    </main>
  );
});

export default App;
