import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/userSlice";

function ContainerOutsideExample() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userGlobal = useSelector((state) => state.user);
  console.log("userGlobal", userGlobal);
  function handleLogOut() {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Navbar
      expand="lg"
      className="bg-danger "
    >
      {/* <Container> */}
      <Container>
        <Navbar.Brand
          className="fw-bold text-white"
          href="#"
        >
          EDI Indonesia
        </Navbar.Brand>
        {userGlobal.id === 0 ? null : (
          <div className="navbar-nav ms-auto">
            <Dropdown>
              <Dropdown.Toggle
                variant="danger"
                id="dropdown-basic"
              >
                👋 Hii, {userGlobal.email}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </Container>
    </Navbar>
    // </Container>
  );
}

export default ContainerOutsideExample;
