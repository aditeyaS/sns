import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Logo } from "./Logo";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between">
      <Button asChild variant={"ghost"}>
        <Link to="/">
          <Logo />
          SNS
        </Link>
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  );
}
