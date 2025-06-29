import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const changePassword = async (currentPassword, newPassword) => {
    if (!user) {
      toast.error("Bạn chưa đăng nhập.");
      return;
    }

    setIsLoading(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      toast.success("Đổi mật khẩu thành công!");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/weak-password") {
        toast.error("Mật khẩu mới quá yếu!");
      } else {
        toast.error("Mật khẩu hiện tại không đúng");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};

export default useChangePassword;
