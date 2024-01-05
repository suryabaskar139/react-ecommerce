import { Link, useNavigate } from "react-router-dom";
import Search from "./search";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";

export default function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.authState);
  const { items:cartItems } = useSelector((state) => state.cartState);
  console.log("user", user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout);
  };


  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            {" "}
            <img width="150px" src="images/logo.png" />{" "}
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 d-flex justify-content-center">
        {isAuthenticated ? (
          <Dropdown>
            <Dropdown.Toggle variant="default text-white" id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={user.avatar ?? "./images/profile.jpg"}
                />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  navigate("/myprofile");
                }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={logoutHandler}>
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}

        <Link to="/cart" className="mt-3 ml-3">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}
