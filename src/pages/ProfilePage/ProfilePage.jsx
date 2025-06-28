import { useState } from "react";
import ProfileUserHeader from "../../components/profileUser/ProfileUserHeader";
import ProfileTabs from "../../components/profileUser/ProfileTabs";
import ProfileUserPosts from "../../components/profileUser/ProfileUserPosts";
import { useParams, Outlet, useLocation } from "react-router-dom";
import useGetProfileUserByUsername from "../../hooks/useGetProfileUserByUsername";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import useIsBlockedUser from "../../hooks/useIsBlockedUser";
const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetProfileUserByUsername(username);
  const [pickCategory, setPickCategory] = useState("post");
  const findUserInfo = !userProfile && isLoading;
  const localtion = useLocation();
  const { blockedByMe, blockedByThem } = useIsBlockedUser(userProfile?.uid);
  if (findUserInfo) return <UserNotFound />;
  if (blockedByThem) return <UserNotFound />;
  return (
    userProfile && (
      <div className="text-white flex flex-col w-full items-center gap-y-2">
        <div className="flex w-full flex-col items-center">
          <ProfileUserHeader blockedByMe={blockedByMe} />
        </div>
        {!blockedByMe && (
          <>
            <div className="flex w-full max-w-4xl flex-col">
              <ProfileTabs
                pickCategory={pickCategory}
                setPickCategory={setPickCategory}
                userProfile={userProfile}
              />
            </div>

            <div
              className={`${
                localtion.pathname === `/${username}` ? "flex" : "hidden"
              } w-full max-w-4xl justify-center min-h-[50vh]`}
            >
              <ProfileUserPosts />
            </div>

            <div className="w-full max-w-4xl">
              <Outlet />
            </div>
          </>
        )}
        <div className={` ${blockedByMe ? "absolute bottom-10" : "w-full text-center pt-20 pb-10"}`}>
          <Footer />
        </div>
      </div>
    )
  );
};

export default ProfilePage;

export const UserNotFound = () => {
  return (
    <div className="w-full flex flex-col items-center text-white justify-center h-[80vh] px-4">
      <div className="max-w-md text-center">
        <p className="text-2xl font-bold mb-2 md:whitespace-nowrap">
          Rất tiếc, trang này hiện không khả dụng.
        </p>
      </div>
      <div>
        <p className="text-sm md:whitespace-nowrap max-md:text-center">
          Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ
          bỏ.
          <Link to="/">
            <span className="text-blue-500 hover:underline cursor-pointer ml-1">
              Quay lại instagram.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
