import { AuthEndpoint } from "@/api/endpoints/AuthEndpoint";
import Logo from "@/assets/logo.svg";
import { Button, Input } from "@/components/ui";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    AuthEndpoint.login(username, password);
    return;
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
          id="username"
          name="username"
          onChange={setUsername}
          required
          placeholder="Введите почту"
        />
        <Input
          id="password"
          name="password"
          type="password"
          onChange={setPassword}
          required
          placeholder="Введите пароль"
        />
        <Button className="mt-4">Войти</Button>
      </form>
    </div>
  );
};

export default Login;
