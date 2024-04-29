import Header from "./Header";
import Container from "./ui/Container";
import PostList from "./PostList";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <div className="space-y-10">
          <div className="flex gap-y-8 py-4 sm:py-6 lg:py-8">
            <PostList />
          </div>
        </div>
      </Container>
    </>
  );
}
