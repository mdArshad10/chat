import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((store) => store.user);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useSelector((store) => store.user);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
