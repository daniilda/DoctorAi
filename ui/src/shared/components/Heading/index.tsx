import Logo from "@/assets/logo.svg";
import { ProfileBadge } from "./components/ProfileBadge";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { AppLinks } from "./components/AppLinks";

const Heading = () => (
  <>
    <header className="h-16 z-10 fixed flex w-full bg-bg-nav/70 backdrop-blur-md justify-center shadow-sm">
      <nav className="max-w-screen-max font-medium w-full items-center flex px-4 lg:px-8">
        <Logo className="min-w-[120px] max-w-[120px] overflow-hidden transition-none" />
        <AppLinks />
        <section className="ml-auto flex items-center">
          <ThemeSwitcher />
          <ProfileBadge />
        </section>
      </nav>
    </header>
    {/* measurer */}
    <div className="h-16" />
  </>
);

export default Heading;
