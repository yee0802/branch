import { Post } from "@/interfaces/Post";
import { getPostBySlugAPI } from "@/service/apiClient";
import { useParams } from "react-router-dom";
import Container from "./ui/Container";
import Header from "./Header";
import ArticleSkeleton from "./ui/ArticleSkeleton";
import PostPageContent from "./ui/PostPageContent";
import FallbackPage from "./FallbackPage";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import PostPageComments from "./ui/PostPageComments";

const PostPage = () => {
  const params = useParams();
  const { slug } = params;

  const { data, status, error } = useQuery<Post>({
    queryKey: ["post-page", slug],
    queryFn: ({ queryKey }) =>
      getPostBySlugAPI(queryKey[1] as string).then((res) => res.post),
    retry: false,
  });

  if (status === "error") {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";
      const statusCode = error.response?.status ?? 500;

      return <FallbackPage message={errorMessage} status={statusCode} />;
    }

    return (
      <FallbackPage message="A non-Axios server error occurred" status={500} />
    );
  }

  return (
    <>
      <Header />
      <Container>
        <div className="flex justify-center gap-y-8 py-4 sm:py-6 lg:py-8 ">
          {status === "pending" ? (
            <ArticleSkeleton />
          ) : (
            <div className="flex w-[48rem] flex-col gap-6">
              <PostPageContent post={data} />
              <PostPageComments post={data} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default PostPage;
