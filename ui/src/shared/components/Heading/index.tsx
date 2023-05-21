import Logo from "@/assets/logo.svg";

const Heading = () => {
  console.log(Logo);
  return (
    <nav className="h-16 bg-bg-nav flex justify-center">
      <div className="max-w-screen-max w-full p-2 flex items-center">
        <Logo width="120" />
      </div>
    </nav>
  );
};

export default Heading;
