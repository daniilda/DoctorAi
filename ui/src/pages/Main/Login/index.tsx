import Logo from "@/assets/logo.svg";
import { Button, Input } from "@/components/ui";

const Login = () => {
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.children.title.value;
    const password = e.target.children.title.value;
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
          id="email"
          name="email"
          type="email"
          required
          placeholder="Введите почту"
        />
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Введите пароль"
        />
        <Button className="mt-4">Войти</Button>
      </form>
    </div>
  );
};

export default Login;
