import Logo from "@/assets/logo.svg";
import { Button, Input } from "@/components/ui";
import AuthStore from "@/stores/authStore";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("housemd");
  const [username, setUsername] = useState("housemd");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    const success = await AuthStore.login(username, password);
    if (success) navigate("/dashboard");
    setError(!success);
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
          value={username}
          disabled={disabled}
          error={error && !disabled}
          onChange={setUsername}
          placeholder="Введите имя"
        />
        <Input
          value={password}
          disabled={disabled}
          error={error && !disabled}
          type="password"
          onChange={setPassword}
          placeholder="Введите пароль"
        />
        <Button className="mt-4" disabled={disabled || !username || !password}>
          Войти
        </Button>
      </form>
    </main>
  );
};

export default Login;
