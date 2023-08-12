import "./base.css";
import "./transitions.scss";
import { observer } from "mobx-react-lite";
import { ThemeStore } from "@/stores/themeStore";
import { BrowserRouter } from "react-router-dom";
import Main from "../pages/Main";

const App = observer(() => {
  return (
    <div
      className={`${ThemeStore.theme} items-center text-text-main bg-bg-primary w-full min-h-full flex flex-col overflow-x-hidden`}
    >
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
});

export default App;
