import { ModeToggle } from "@/components/ui/ModeToggle.tsx";
import Container from "./ui/Container.tsx";
import { Link } from "react-router-dom";
import ProfileButton from "./ui/ProfileButton.tsx";

export default function Header() {
  return (
    <header className="fixed w-full border-b bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:flex sm:justify-between">
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Branch🌿</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
