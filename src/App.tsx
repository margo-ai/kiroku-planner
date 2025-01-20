import { Button, Layout as Container } from "antd";
import { Content } from "antd/es/layout/layout";
import { ReactNode, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Header } from "./Components/Layout/Header/Header";
import { Home } from "./Components/Pages/Home";
import { Login } from "./Components/Pages/Login";
import { Registration } from "./Components/Pages/Registration";
import AuthProvider from "./features/Auth/AuthProvider";
import { useAuthContext } from "./features/Auth/authContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { loading } = useAuthContext();
  const userUid = localStorage.getItem("uid");

  if (loading) {
    return <div>LOADING</div>;
  }
  console.log(userUid, loading);

  if (userUid) {
    return children;
  }

  return <Navigate to="/login" />;
};

function App() {
  const navigate = useNavigate();

  const userUid = localStorage.getItem("uid");

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userData: UserData = {
  //         uid: user.uid,
  //         name: user.displayName,
  //         email: user.email,
  //         photo: user.photoURL
  //       };
  //       console.log("user data", userData);
  //     } else {
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    console.log(userUid);
  }, [userUid]);

  return (
    <AuthProvider>
      <Container className="app">
        <Header />

        <Content className="content" style={{ color: "#fff" }}>
          <Routes>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={userUid ? <Navigate replace to="/" /> : <Login />} />
            <Route
              path="/registration"
              element={userUid ? <Navigate replace to="/" /> : <Registration />}
            />
            <Route
              path="/boards"
              element={
                <ProtectedRoute>
                  <div>
                    BOARDS<Button onClick={() => navigate("/")}>TO HOME</Button>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/lalala"
              element={
                <ProtectedRoute>
                  <div>
                    LALALA<Button onClick={() => navigate("/")}>TO HOME</Button>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>error</div>} />
          </Routes>
        </Content>
      </Container>
    </AuthProvider>
  );
}

export default App;
