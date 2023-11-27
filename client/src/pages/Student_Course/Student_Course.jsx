import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import("../../styles/student_coures.scss");
import { removeStudentCourse } from "../../app/feauters/student_course/studentCourseSlice";
import { deleteRequest } from "../../utils/apiHelperMethodes";
import Add from "./Add";
import Edit from "./Edit";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { Pagination, Table } from "rsuite";
import { open } from "../../app/feauters/modal/modalSlice";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
const { Column, HeaderCell, Cell } = Table;

function Student_Course() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [id, setId] = useState("");
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { openFor, isOpend } = useSelector((store) => store.Modal);
  const { student_courses } = useSelector((store) => store.studentCourse);
  const dispatch = useDispatch();

  // mapping the open modal with componentes
  const openMap = new Map([
    ["Add-student_course", <Add />],
    ["Edit-student_course", <Edit id={id} />],
  ]);
  const onAddStudentsss = () => {
    dispatch(open("Add-student_course"));
  };

  const onEdit = (id) => {
    dispatch(open("Edit-student_course"));
    setId(id);
  };
  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this Course"
    );
    if (userResponse) {
      const data = await deleteRequest(
        "http://localhost:5000/api/studet_courses",
        id
      );
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeStudentCourse({ id }));
      toast.success(data["message"]);
    }
  };

  // paggination
  const data = student_courses.filter((v, i) => {
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
        <Column width={200} align="center" resizable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Student ID</HeaderCell>
          <Cell dataKey="studentId" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Course ID</HeaderCell>
          <Cell dataKey="courseId" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Course Name</HeaderCell>
          <Cell dataKey="course_name" />
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
          total={student_courses.length}
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

export default Student_Course;
