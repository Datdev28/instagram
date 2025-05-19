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
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [authUser, loading] = useAuthState(auth);
  const { progress } = useLoadingBarStore();
  const { setUser, user } = useAuthStore();
  const [loadingData, setLoadingData] = useState(false);
  const renderData = async () => {
    try {
      setLoadingData(true);
      const docRef = doc(fireStore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      localStorage.setItem("user", JSON.stringify(docSnap.data()));
      setUser(docSnap.data());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };
  useEffect(() => {
    renderData();
  }, []);
  if (loading || loadingData) return <LoadingPage />;
  return (
    <>
      <PageLayout>
        <LoadingBar height={3} color="#df9547" progress={progress} />
        <Routes>
          <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <AuthPage />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/qr" element={authUser ? <QrPage /> : <Navigate to="/auth" />} />
          <Route path="/explore" element={authUser ? <SuggestedPage/> : <Navigate to="/auth"/>}/>
        </Routes>
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
          src="icon_insta_loading.png"
          className="w-[80px] h-[80px]"
          alt="instagram"
        />
      </span>
      <span className="absolute bottom-[32px] left-1/2 -translate-x-1/2">
        <img
          src="icon_meta_loading.png"
          className="w-[72px] h-[37px]"
          alt="meta"
        />
      </span>
    </div>
  );
};
