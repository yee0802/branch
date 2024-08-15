import { Post } from "@/interfaces/Post";
import { getPostBySlugAPI } from "@/service/apiClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "./ui/Container";
import Header from "./Header";
import ArticleSkeleton from "./ui/ArticleSkeleton";
import PostPageContent from "./ui/PostPageContent";
import FallbackPage from "./FallbackPage";

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    if (slug) {
      getPostBySlugAPI(slug)
        .then((res) => setPost(res.post))
        .catch((err) => {
          console.error(err);
          setError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  if (error) {
    return <FallbackPage message="A server error occured." status={500} />;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="flex justify-center gap-y-8 py-4 sm:py-6 lg:py-8 ">
          {isLoading ? <ArticleSkeleton /> : <PostPageContent post={post} />}
        </div>
      </Container>
    </>
  );
};

export default PostPage;
