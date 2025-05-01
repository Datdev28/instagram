import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
function App() {
  return (
    <>
     <PageLayout>
      <Routes>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:username" element={<ProfilePage/>}/>
      </Routes>
     </PageLayout>
    </>
  );
}

export default App;
