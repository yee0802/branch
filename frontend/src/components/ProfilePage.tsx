import useAuth from "@/hooks/useAuth";
import defaultProfileImage from "@/assets/Default_pfp.jpg";
import Header from "./Header";
import Container from "./ui/Container";
import EditProfileButton from "./ui/EditProfileButton";
import { useParams } from "react-router-dom";
import { getUserByUsernameAPI } from "@/service/apiClient";
import User from "@/interfaces/User";
import UserPosts from "./ui/UserPosts";
import { formatDate } from "@/lib/utils";
import FallbackPage from "./FallbackPage";
import ProfileSkeleton from "./ui/ProfileSkeleton";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const ProfilePage = () => {
  const { user } = useAuth();
  const { usernameParam } = useParams();

  const { data, status, error } = useQuery<User>({
    queryKey: ["user-profile", usernameParam],
    queryFn: ({ queryKey }) =>
      getUserByUsernameAPI(queryKey[1] as string).then((res) => res.user),
    retry: false,
  });

  if (!user) {
    return (
      <FallbackPage
        message="You are unauthorized to view this page."
        status={401}
      />
    );
  }

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
        <div className="flex h-full flex-col items-center gap-y-8 px-2 py-4 sm:py-6 lg:py-8">
          {status === "pending" ? (
            <ProfileSkeleton />
          ) : (
            <>
              <div className="mt-[89px] h-fit w-full max-w-3xl space-y-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
                <div className="flex flex-col items-center">
                  <img
                    className="rounded-full"
                    src={data.avatarURL ?? defaultProfileImage}
                    alt="user-profile-image"
                    width={250}
                  />
                </div>
                <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                  <div className="me-auto space-y-3">
                    <div>
                      <h1 className="text-2xl font-bold sm:text-3xl">
                        {data.firstName && data.lastName
                          ? `${data.firstName} ${data.lastName}`
                          : usernameParam}
                      </h1>
                      <div className="text-muted-foreground">
                        @{usernameParam}
                      </div>
                    </div>
                    <div>
                      Member since {data ? formatDate(data.createdAt) : null}
                    </div>
                    <div className="flex items-center gap-3">
                      Posts:{" "}
                      <span className="font-semibold">
                        {data?.posts.length}
                      </span>
                    </div>
                  </div>

                  {usernameParam == user.username ? (
                    <EditProfileButton
                      id={data.id}
                      avatarURL={data.avatarURL}
                    />
                  ) : null}
                </div>
                {data.bio && (
                  <>
                    <hr />
                    <div className="overflow-hidden whitespace-pre-line break-words">
                      <p>{data.bio}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="w-full max-w-3xl space-y-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
                <h2 className="text-center text-lg font-bold sm:text-2xl ">
                  Posts
                </h2>
              </div>

              <UserPosts posts={data.posts} />
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
