import { useEffect, useState } from "react";
import { Pagination, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import { FaTrash, FaRegEdit } from "react-icons/fa";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../app/feauters/modal/modalSlice";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import { removeCourse, setCourse } from "../../app/feauters/course/courseSlice";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { fetchRequest, deleteRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

function ListCourse() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [id, setId] = useState("");
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { openFor, isOpend } = useSelector((store) => store.Modal);
  const { courses } = useSelector((store) => store.Course);
  const dispatch = useDispatch();

  // mapping the open modal with componentes
  const openMap = new Map([
    ["Add-course", <AddCourse />],
    ["Edit-course", <EditCourse id={id} />],
  ]);

  const onAddCourse = () => {
    dispatch(open("Add-course"));
  };

  const onEdit = (id) => {
    dispatch(open("Edit-course"));
    setId(id);
  };

  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this Course"
    );
    if (userResponse) {
      const data = await deleteRequest("http://localhost:5000/api/courese", id);
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeCourse({ id }));
      toast.success(data["message"]);
    }
  };

  const fetchCourse = async () => {
    const data = await fetchRequest("http://localhost:5000/api/courese");
    dispatch(setCourse({ courses: data.courses }));
  };

  useEffect(() => {
    fetchCourse();
  }, [dispatch]);
  // paggination
  const data = courses.filter((v, i) => {
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
          <button onClick={onAddCourse} className="button">
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
          <HeaderCell>Course Name</HeaderCell>
          <Cell dataKey="course_name" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Course Code</HeaderCell>
          <Cell dataKey="course_code" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Credit Hours</HeaderCell>
          <Cell dataKey="credit_hour" />
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
          total={courses.length}
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

export default ListCourse;
