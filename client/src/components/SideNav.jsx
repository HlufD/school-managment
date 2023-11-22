import { Sidenav, Nav, Toggle } from "rsuite";
import { Icon } from "@rsuite/icons";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import {
  FaUniversity,
  FaGraduationCap,
  FaBookOpen,
  FaUserCog,
} from "react-icons/fa";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import React from "react";
import("../styles/SideNav.scss");
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../app/feauters/user/userSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
axios.defaults.withCredentials = true;

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function SideNav() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  const history = useNavigate();
  const dispatch = useDispatch();
  const { removeValue } = useLocalStorage("isLogedIn");
  const hanldeLogout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/logout", null, {
        withCredentials: true,
      });
      const data = await res.data;
      dispatch(logout());
      removeValue();
      toast.success("logout successful!");
      history("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        position: "sticky",
        overflowY: "hidden",
        width: 240,
        height: "100vh",
        paddingTop: "20px",
        backgroundColor: "#F7F7FA",
      }}
    >
      <Toggle
        onChange={setExpanded}
        checked={expanded}
        checkedChildren="Expand"
        unCheckedChildren="Collapse"
        style={{ marginLeft: "27px" }}
      />
      <hr />
      <Sidenav expanded={expanded}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              as={NavLink}
              href="/dashboard"
              eventKey="1"
              icon={<DashboardIcon />}
            >
              Dashboard
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="2"
              title="Students"
              icon={<Icon as={FaGraduationCap} />}
            >
              <Nav.Item as={NavLink} href="add_student" eventKey="2-1">
                Register Student
              </Nav.Item>
              <Nav.Item as={NavLink} href="list_students" eventKey="2-3">
                List Student
              </Nav.Item>
              <Nav.Item as={NavLink} href="edit_student" eventKey="2-4">
                Edit Student
              </Nav.Item>
            </Nav.Menu>

            <Nav.Item
              as={NavLink}
              href="list_departments"
              eventKey="3"
              icon={<Icon as={FaUniversity} />}
            >
              Departments
            </Nav.Item>

            <Nav.Item
              as={NavLink}
              href="list_courses"
              eventKey="4"
              icon={<Icon as={FaBookOpen} />}
            >
              Courses
            </Nav.Item>

            <Nav.Item icon={<Icon as={FaUserCog} />} eventKey="5">
              Users
            </Nav.Item>

            <Nav.Menu
              placement="rightStart"
              eventKey="5"
              title="Othes Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="5-1" as={NavLink} href="school-years">
                School Years
              </Nav.Item>
              <Nav.Item as={NavLink} href="levels" eventKey="5-2">
                Leves
              </Nav.Item>
              <Nav.Item as={NavLink} href="student-types" eventKey="5-2">
                Programs
              </Nav.Item>
            </Nav.Menu>
            <Nav.Item eventKey="7" icon={<Icon as={MdLogout} />}>
              <p onClick={hanldeLogout}>Logout</p>
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
      </Sidenav>
    </div>
  );
}

export default SideNav;
