import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import { deleteRequest, fetchRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import {
  removeDepaetment,
  setDepartment,
} from "../../app/feauters/department/departmentSlice";
import { Pagination, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { open } from "../../app/feauters/modal/modalSlice";
import Modal from "../../components/Modal";

function ListDepartments() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [id, setId] = useState("");
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { openFor, isOpend } = useSelector((store) => store.Modal);
  const { departments } = useSelector((store) => store.Department);
  const dispatch = useDispatch();
  // mapping the open modal with componentes
  const openMap = new Map([
    ["Add-Department", <AddDepartment />],
    ["Edit-Department", <EditDepartment id={id} />],
  ]);

  const fetchCourse = async () => {
    const data = await fetchRequest("http://localhost:5000/api/departments");
    dispatch(setDepartment({ departments: data.departments }));
  };

  // eventes
  const onAddDepartment = () => {
    dispatch(open("Add-Department"));
  };
  const onEdit = (id) => {
    dispatch(open("Edit-Department"));
    setId(id);
  };

  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this Course"
    );
    if (userResponse) {
      const data = await deleteRequest(
        "http://localhost:5000/api/departments",
        id
      );
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeDepaetment({ id }));
      toast.success(data["message"]);
    }
  };

  const data = departments.filter((v, i) => {
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
          <button onClick={onAddDepartment} className="button">
            Add Course
          </button>
        </div>
      </header>
      <hr />
      <Table height={300} data={data}>
        <Column width={200} align="center" resizable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Department Name</HeaderCell>
          <Cell dataKey="dep_name" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Department Code</HeaderCell>
          <Cell dataKey="dep_code" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Edit</HeaderCell>
          <Cell>
            {(course) => (
              <FaRegEdit
                className="edit icon"
                onClick={() => onEdit(course.id)}
              />
            )}
          </Cell>
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            {(course) => (
              <FaTrash
                className="delete icon"
                onClick={() => onDelete(course.id)}
              />
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
          total={departments.length}
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

export default ListDepartments;
