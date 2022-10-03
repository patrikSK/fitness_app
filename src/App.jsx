import { React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//hellpers
import { setAuthToken } from "./helpers/setAuthToken";

//pages
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramPage from "./pages/ProgramPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ExercisesPage from "./pages/ExercisesPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import ExercisePage from "./pages/ExercisePage";
import HistoryPage from "./pages/HistoryPage";
import HistoryExercisesPage from "./pages/HistoryExercisesPage";
import ExerciseHistory from "./pages/ExerciseHistory";

//
//components
import RequireAuth from "./components/RequireAuth";
import UnrequireAuth from "./components/UnrequireAuth";

//custom hooks
import useRole from "./hooks/useRole";

function App() {
  const { setRole } = useRole();

  useEffect(() => {
    //check if jwt token is stored in local storage, and than mount/unmount token to every request to authorization header
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    //get role from local storage and set to setAuth after page reload
    const role = localStorage.getItem("role");

    if (role) {
      setRole(role);
    }
  }, [setRole]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*.....public route - loged user dont have access........*/}
            <Route element={<UnrequireAuth />}>
              <Route index element={<WelcomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            {/*.....user & admin routes.........*/}
            <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="exercises" element={<ExercisesPage />} />
              <Route path="programs/:programId" element={<ProgramPage />} />
              <Route path="exercise/:exerciseId" element={<ExercisePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="history/:date" element={<HistoryExercisesPage />} />
              <Route path="history/exercise/:exerciseId" element={<ExerciseHistory />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            {/*.......admin routes.......*/}
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
