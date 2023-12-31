import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import { deleteRequest, fetchRequest } from "../../utils/apiHelperMethodes";
import { FaTrash, FaRegEdit, FaEye } from "react-icons/fa";
import { Pagination, Table } from "rsuite";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
const { Column, HeaderCell, Cell } = Table;
import {
  removeStudent,
  setStudent,
} from "../../app/feauters/student/studentSlice";
import { open } from "../../app/feauters/modal/modalSlice";
import { Link } from "react-router-dom";

function ListStudents() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [id, setId] = useState("");
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { openFor, isOpend } = useSelector((store) => store.Modal);
  const { students } = useSelector((store) => store.Student);
  const dispatch = useDispatch();

  // mapping the open modal with componentes
  const openMap = new Map([
    ["Add-student", <AddStudent />],
    ["Edit-student", <EditStudent id={id} />],
  ]);
  const onAddStudentsss = () => {
    dispatch(open("Add-student"));
  };

  const onEdit = (id) => {
    dispatch(open("Edit-student"));
    setId(id);
  };
  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this Course"
    );
    if (userResponse) {
      const data = await deleteRequest(
        "http://localhost:5000/api/students",
        id
      );
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeStudent({ id }));
      toast.success(data["message"]);
    }
  };

  // paggination
  const data = students.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <div className="list">
      <header className="course-header">
        <div className="search">
          <input type="text" placeholder="search" />
        </div>
        <div className="button-container">
          <button onClick={onAddStudentsss} className="button">
            Add Student
          </button>
        </div>
      </header>
      <hr />
      <Table height={300} data={data}>
        <Column width={100} align="center" resizable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="first_name" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="last_name" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Age</HeaderCell>
          <Cell dataKey="age" />
        </Column>
        <Column width={70} resizable>
          <HeaderCell>Sex</HeaderCell>
          <Cell dataKey="sex" />
        </Column>

        <Column width={130} resizable>
          <HeaderCell>phone_number</HeaderCell>
          <Cell dataKey="phone_number" />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Sex</HeaderCell>
          <Cell dataKey="sex" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Department</HeaderCell>
          <Cell dataKey="departmentId" />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Edit</HeaderCell>
          <Cell>
            {(student) => (
              <FaRegEdit
                className="edit icon"
                onClick={() => onEdit(student.id)}
              />
            )}
          </Cell>
        </Column>
        <Column width={50} resizable>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            {(student) => (
              <FaTrash
                className="delete icon"
                onClick={() => onDelete(student.id)}
              />
            )}
          </Cell>
        </Column>
        <Column width={50} resizable>
          <HeaderCell>Viwe</HeaderCell>
          <Cell>
            {(student) => (
              <Link to={`/dashboard/viwe_student/${student.id}`}>
                <FaEye className="delete icon" />
              </Link>
            )}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={students.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      {isOpend && <Modal title={openFor}>{openMap.get(openFor)}</Modal>}
    </div>
  );
}

export default ListStudents;
