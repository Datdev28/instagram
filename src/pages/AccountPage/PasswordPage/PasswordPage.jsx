import { useState } from "react";
import { toast } from "react-toastify";
import useChangePassword from "../../../hooks/useChangePassword";
import Footer from "../../../components/footer/Footer";

const PasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { changePassword, isLoading } = useChangePassword();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới không trùng khớp.");
      return;
    }
    await changePassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <p className="text-2xl font-bold">Mật khẩu và bảo mật</p>
      <p className="text-sm text-color-text-gray">
        Bạn nên thay đổi mật khẩu thường xuyên để bảo đảm an toàn cho tài khoản
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-10 p-6 border border-gray-700 rounded-xl shadow-lg mx-auto max-w-[400px]"
      >
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text">
          Đổi mật khẩu
        </h2>
        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white font-semibold rounded-lg cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default PasswordPage;
