import CommentListItem from "./CommentListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsByPostWithCursorAPI } from "@/service/apiClient";
import CommentListSkeleton from "./CommentListSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import CommentsAxiosResponse from "@/interfaces/CommentsAxiosResponse";
import { useState } from "react";

type PostPageCommentsListProps = {
  postId: string;
};

const PostPageCommentsList: React.FC<PostPageCommentsListProps> = ({
  postId,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, status, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<CommentsAxiosResponse>({
      queryKey: ["comment-list", postId],
      queryFn: ({ pageParam }) =>
        getCommentsByPostWithCursorAPI(postId, pageParam),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  if (status === "error") {
    return (
      <p className="flex items-center justify-center gap-4 text-center text-xl">
        <span className="text-3xl text-destructive">500</span> An error occurred
        while loading comments
      </p>
    );
  }

  if (status === "pending") {
    return <CommentListSkeleton />;
  }

  const handleNextPageClick = () => {
    if (hasNextPage) {
      fetchNextPage();
    }

    if (data.pages[currentPage].hasNextPage) {
      setCurrentPage((page) => page + 1);
    }
  };

  const handlePrevPageClick = () => {
    setCurrentPage((page) => Math.max(page - 1, 0));
  };

  return (
    <div className="flex flex-col gap-4">
      {data.pages.flatMap((page) => page.comments).length === 0 ? (
        <p className="w-full max-w-3xl text-center">
          This post has no comments
        </p>
      ) : (
        <>
          {isFetching ? (
            <CommentListSkeleton />
          ) : (
            data.pages[currentPage].comments.map((comment) => (
              <CommentListItem comment={comment} key={comment.id} />
            ))
          )}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => handlePrevPageClick()}
                  isActive={currentPage > 0 ? true : false}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => handleNextPageClick()}
                  isActive={!isFetching && data.pages[currentPage].hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default PostPageCommentsList;
