import { Sidenav, Nav, Toggle } from "rsuite";
import { Icon } from "@rsuite/icons";
import { Link } from "react-router-dom";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import {
  FaUniversity,
  FaGraduationCap,
  FaBookOpen,
  FaUserCog,
} from "react-icons/fa";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import React from "react";
import("../styles/SideNav.scss");

function SideNav() {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <div
      style={{
        position: "sticky",
        overflowY: "scroll",
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
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="2"
              title="Students"
              icon={<Icon as={FaGraduationCap} />}
            >
              <Nav.Item eventKey="2-1">
                <Link style={{ textDecoration: "none" }} to={"RegisterStudent"}>
                  Register Student
                </Link>
              </Nav.Item>
              <Nav.Item eventKey="2-2">Viwe Student</Nav.Item>
              <Nav.Item eventKey="2-3">Edit Student</Nav.Item>
              <Nav.Item eventKey="2-4">List Student</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="Departments"
              icon={<Icon as={FaUniversity} />}
            >
              <Nav.Item eventKey="3-1">Add Department</Nav.Item>
              <Nav.Item eventKey="3-2">Viwe Department</Nav.Item>
              <Nav.Item eventKey="3-3">Edit Department</Nav.Item>
              <Nav.Item eventKey="3-4">List Department</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Courses"
              icon={<Icon as={FaBookOpen} />}
            >
              <Nav.Item eventKey="4-1">Add Course</Nav.Item>
              <Nav.Item eventKey="4-2">Viwe Course</Nav.Item>
              <Nav.Item eventKey="4-3">Edit Course</Nav.Item>
              <Nav.Item eventKey="4-4">List Course</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="5"
              title="Users"
              icon={<Icon as={FaUserCog} />}
            >
              <Nav.Item eventKey="5-1">Add User</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="6"
              title="Othes Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="6-1">Course-Department</Nav.Item>
              <Nav.Item eventKey="6-2">Student-Course</Nav.Item>
              <Nav.Item eventKey="6-3">Type | year | Leves</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
      </Sidenav>
    </div>
  );
}

export default SideNav;
