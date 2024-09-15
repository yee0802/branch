import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultProfileImage from "@/assets/Default_pfp.jpg";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserByUsernameAPI } from "@/service/apiClient";
import User from "@/interfaces/User";

const ProfileButton = () => {
  const { logout, user, token } = useAuth();

  const queryClient = useQueryClient();

  const { data } = useQuery<User>({
    queryKey: ["user-profile", user?.username],
    queryFn: ({ queryKey }) =>
      getUserByUsernameAPI(queryKey[1] as string).then((res) => res.user),
    staleTime: Infinity,
    enabled: !!user?.username && !!token,
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.avatarURL ?? defaultProfileImage} />
          <AvatarFallback delayMs={400}>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={`/users/${user?.username}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                queryClient.clear();
                logout();
              }}
            >
              Log Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/register">Register</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/login">Login</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
