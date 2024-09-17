import Header from "./Header";
import Container from "./ui/Container";
import PostList from "./PostList";
import { getAllPostsAPI } from "@/service/apiClient";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <div className="space-y-10">
          <div className="flex justify-center gap-y-8 py-4 sm:py-6 lg:py-8">
            <PostList
              getPosts={getAllPostsAPI}
              isMainFeed
              className="mt-[89px] w-full max-w-2xl space-y-4 px-2 md:px-4"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
