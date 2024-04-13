import { ModeToggle } from "@/components/ui/ModeToggle.tsx";
import Container from "./ui/Container.tsx";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b px-4 py-3 sm:flex sm:justify-between">
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Branch🌿</h1>
            </Link>
          </div>

          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
