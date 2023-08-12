import Logo from "@/assets/logo.svg";
import { Button, Input } from "@/components/ui";
import AuthStore from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    setError(false);
    if (!username || !password) {
      setError(true);
    } else {
      const success = await AuthStore.login(username, password);
      if (!success) {
        setError(true);
      }
      if (success) navigate("/dashboard");
    }
    setDisabled(false);
  };

  return (
    <main className="flex flex-col items-center w-full px-4">
      <Logo className="max-w-xs sm:max-w-md mt-20" />
      <form
        className="flex flex-col mt-16 w-full sm:max-w-[368px] gap-4 px-6"
        onSubmit={onFormSubmit}
      >
        <h2 className="text-center font-bold text-3xl mb-4">Вход на сайт</h2>
        <Input
          disabled={disabled}
          error={error}
          onChange={setUsername}
          placeholder="Введите имя"
        />
        <Input
          disabled={disabled}
          error={error}
          type="password"
          onChange={setPassword}
          placeholder="Введите пароль"
        />
        <Button className="mt-4" disabled={disabled}>
          Войти
        </Button>
      </form>
    </main>
  );
};

export default Login;
