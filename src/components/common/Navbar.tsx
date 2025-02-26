import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { getIsAuthenticated, logoutUser } from "@/redux/slice/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/types/redux";
import axios from "axios";
import { NavLinks } from "@/config/Navlinks";

function Navbar() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsAuthenticated);
  const navigate = useNavigate();
  const handleOnLogIn = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    try {
      const endpoint = "http://localhost:8000/api/auth/log-out";
      await axios.get(endpoint, {
        withCredentials: true,
      });
      dispatch(logoutUser());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-slate-800 text-white py-3.5 md:py-4">
      <div className="flex container justify-between items-center">
        <div
          className="font-semibold md:text-lg tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1>Interview Scheduler</h1>
        </div>
        <div className="flex gap-8 md:gap-12 items-center">
          <ul className="hidden sm:flex gap-4 md:gap-6 font-semibold tracking-wide md:text-lg">
            {NavLinks.map(({ name, href }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `border-b-2 border-transparent pb-1 ${
                      isActive ? "!border-white" : ""
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button
            className="bg-white text-black font-bold text-base hover:bg-white"
            onClick={isLoggedIn ? handleLogout : handleOnLogIn}
          >
            {isLoggedIn ? "Log Out" : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
