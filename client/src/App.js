import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./App.css";
import Biodata from "./pages/Biodata";
import NavbarMain from "./components/NavbarMain";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HOC from "./HOC/Hoc";
import DetailBioData from "./pages/DetailBioData";

function App() {
  return (
    <>
      <NavbarMain />
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/biodata"
            element={
              <div>
                <HOC>
                  <Biodata />
                </HOC>
              </div>
            }
          />

          <Route
            path="/biodata/detail/:id"
            element={
              <div>
                <HOC>
                  <DetailBioData />
                </HOC>
              </div>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
