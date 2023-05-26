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

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    if (!username || !password) {
      setError(true);
      return;
    }
    const success = await AuthStore.login(username, password);
    if (!success) {
      setError(true);
    }
    if (success) navigate("/upload");
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <Logo className="max-w-xs sm:max-w-md mt-20" />
      <form
        className="flex flex-col mt-16 w-full sm:max-w-[368px] gap-4 px-6"
        onSubmit={onFormSubmit}
      >
        <h2 className="text-center font-bold text-3xl mb-4">Вход на сайт</h2>
        <Input
          error={error}
          name="username"
          onChange={setUsername}
          placeholder="Введите имя"
        />
        <Input
          error={error}
          name="password"
          type="password"
          onChange={setPassword}
          placeholder="Введите пароль"
        />
        <Button className="mt-4">Войти</Button>
      </form>
    </div>
  );
};

export default Login;
