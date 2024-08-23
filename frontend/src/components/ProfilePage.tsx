import useAuth from "@/hooks/useAuth";
import defaultProfileImage from "@/assets/Default_pfp.jpg";
import Header from "./Header";
import Container from "./ui/Container";
import { useEffect, useState } from "react";
import EditProfileButton from "./ui/EditProfileButton";
import { useParams } from "react-router-dom";
import { getUserByUsernameAPI } from "@/service/apiClient";
import User from "@/interfaces/User";
import UserPosts from "./ui/UserPosts";
import { formatDate } from "@/lib/utils";
import FallbackPage from "./FallbackPage";
import ProfileSkeleton from "./ui/ProfileSkeleton";

const ProfilePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { usernameParam } = useParams();

  const [userProfile, setUserProfile] = useState<User>();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const username = localStorage.getItem("user");

  useEffect(() => {
    setIsLoading(true);

    if (usernameParam) {
      getUserByUsernameAPI(usernameParam)
        .then((res) => setUserProfile(res?.user))
        .catch((err) => {
          console.error(err);
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
          setRefresh(false);
        });
    }
  }, [usernameParam, refresh]);

  if (!isLoggedIn) {
    return (
      <FallbackPage
        message="You are unauthorized to view this page."
        status={401}
      />
    );
  }

  if (error) {
    return <FallbackPage message={"A server error occured."} status={500} />;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="flex h-full flex-col items-center gap-y-8 px-2 py-4 sm:py-6 lg:py-8">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <div className="mt-[89px] h-fit w-full max-w-3xl space-y-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
                <div className="flex flex-col items-center">
                  <img
                    className="rounded-full"
                    src={defaultProfileImage}
                    alt="user-profile-image"
                    width={250}
                  />
                </div>
                <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                  <div className="me-auto space-y-3">
                    <div>
                      <h1 className="text-2xl font-bold sm:text-3xl">
                        {userProfile?.firstName && userProfile.lastName
                          ? `${userProfile?.firstName} ${userProfile?.lastName}`
                          : usernameParam}
                      </h1>
                      <div className="text-muted-foreground">
                        @{usernameParam}
                      </div>
                    </div>
                    <div>
                      Member since{" "}
                      {userProfile ? formatDate(userProfile?.createdAt) : null}
                    </div>
                    <div className="flex items-center gap-3">
                      Posts:{" "}
                      <span className="font-semibold">
                        {userProfile?.posts.length}
                      </span>
                    </div>
                  </div>
                  {usernameParam == username && userProfile?.id ? (
                    <EditProfileButton
                      id={userProfile.id}
                      setRefresh={setRefresh}
                    />
                  ) : null}
                </div>
              </div>

              <div className="w-full max-w-3xl space-y-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
                <h2 className="text-center text-lg font-bold sm:text-2xl ">
                  Posts
                </h2>
              </div>

              {userProfile?.id && <UserPosts posts={userProfile?.posts} />}
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
