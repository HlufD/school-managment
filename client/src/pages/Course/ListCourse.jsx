import { useState } from "react";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import { FaTrash, FaRegEdit } from "react-icons/fa";

const data = [
  { id: 1, course_name: "red", course_code: "#f00", credit_hour: 3 },
  { id: 2, course_name: "green", course_code: "#0f0", credit_hour: 6 },
  { id: 3, course_name: "blue", course_code: "#00f", credit_hour: 3 },
  { id: 4, course_name: "cyan", course_code: "#0ff", credit_hour: 4 },
  { id: 5, course_name: "magenta", course_code: "#f0f", credit_hour: 3 },
];

function ListCourse() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  return (
    <div className="list">
      <header className="course-header">
        <div className="search">
          <input type="text" placeholder="search" />
        </div>
        <div className="button-container">
          <button className="button">Add Course</button>
        </div>
      </header>
      <hr />
      <Table height={300} data={data}>
        <Column width={100} align="center" resizable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Course Name</HeaderCell>
          <Cell dataKey="course_name" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Course Code</HeaderCell>
          <Cell dataKey="course_code" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Course Code</HeaderCell>
          <Cell dataKey="course_code" />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Edit</HeaderCell>
          <Cell>
            <FaRegEdit />
          </Cell>
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            <FaTrash />
          </Cell>
        </Column>
      </Table>
    </div>
  );
}

export default ListCourse;
