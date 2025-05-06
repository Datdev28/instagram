import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import LoadingBar from "react-top-loading-bar";
import useLoadingBarStore from "./store/loadingBarStore";
function App() {
  const [authUser, loading] = useAuthState(auth);
  const {progress} = useLoadingBarStore();
  if(loading) return <LoadingPage/>
  return (
    <>
     <PageLayout>
      <LoadingBar
       height={3}
       color='#df9547'
       progress={progress}
      />
      <Routes>
        <Route path="/auth" element={authUser ? <Navigate to="/"/> : <AuthPage/>}/>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/auth"/>}/>
        <Route path="/:username" element={<ProfilePage/>}/>
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
        <img src="icon_insta_loading.png" className="w-[80px] h-[80px]" alt="instagram" />
      </span>
      <span className="absolute bottom-[32px] left-1/2 -translate-x-1/2">
        <img src="icon_meta_loading.png" className="w-[72px] h-[37px]" alt="meta" />
      </span>
    </div>
   )
}