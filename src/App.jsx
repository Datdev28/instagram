import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoadingBar from "react-top-loading-bar";
import useLoadingBarStore from "./store/loadingBarStore";
import useAuthStore from "./store/authStore";
import QrPage from "./pages/QrPage/QrPage";
import SuggestedPage from "./pages/SuggestedPage/SuggestedPage";
import ModalShowPost from "./components/modal/ModalShowPost";
import ShowPostPage from "./pages/ShowPostPage/ShowPostPage";
import ProfileCollections from "./components/profileUser/ProfileCollections";
import ProfileDetailCollection from "./components/profileUser/ProfileDetailCollection";
import AdminReportsManagement from "./pages/adminPage/AdminReportsManagement";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
function App() {
  const [authUser, loading] = useAuthState(auth);
  const { progress } = useLoadingBarStore();
  const { setUser, user } = useAuthStore();
  const [loadingData, setLoadingData] = useState(false);
  const location = useLocation();
  const renderData = async () => {
    try {
      setLoadingData(true);
      const docRef = doc(fireStore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      localStorage.setItem("user", JSON.stringify(docSnap.data()));
      setUser(docSnap.data());
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setLoadingData(false);
    }
  };
  useEffect(() => {
    if (authUser) {
      renderData();
    }
  }, []);
  if (loading || loadingData) return <LoadingPage />;
  const background = location.state && location.state.background;
  return (
    <>
      <PageLayout>
        <ToastContainer
          position="top-right" 
          autoClose={2000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="dark" 
        />
        <LoadingBar height={3} color="#df9547" progress={progress} />
        <Routes location={background || location}>
          <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <AuthPage />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route path="/:username" element={<ProfilePage/>}>
            <Route path="saved" element={<ProfileCollections/>}></Route>
          </Route>
          <Route path="admin/report-management" element={<AdminReportsManagement/>}/>
          <Route
            path="/:username/saved/all-posts"
            element={<ProfileDetailCollection />}
          ></Route>
          <Route
            path="/:username/saved/:collectionId"
            element={<ProfileDetailCollection isCollection={true}/>}
          ></Route>
          <Route
            path="/qr/:username"
            element={authUser ? <QrPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/explore"
            element={authUser ? <SuggestedPage /> : <Navigate to="/auth" />}
          />
          <Route path="p/:postId" element={<ShowPostPage />}></Route>
        </Routes>
        {background && (
          <Routes>
            <Route path="/p/:postId" element={<ModalShowPost />}></Route>
          </Routes>
        )}
      </PageLayout>
    </>
  );
}

export default App;
const LoadingPage = () => {
  return (
    <div className="w-full h-screen relative">
      <span className="absolute top-[45%] left-1/2 -translate-x-1/2">
        <img
          src="/icon_insta_loading.png"
          className="w-[80px] h-[80px]"
          alt="instagram"
        />
      </span>
      <span className="absolute bottom-[32px] left-1/2 -translate-x-1/2">
        <img
          src="/icon_meta_loading.png"
          className="w-[72px] h-[37px]"
          alt="meta"
        />
      </span>
    </div>
  );
};
