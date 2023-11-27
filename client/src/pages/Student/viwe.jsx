import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRequest } from "../../utils/apiHelperMethodes";
import { Pagination, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

function Viwe() {
  const { id } = useParams();
  const { students } = useSelector((store) => store.Student);
  const [student, setStudent] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // fetching student
  const fetchStudents = async () => {
    const data = await fetchRequest(`http://localhost:5000/api/students/${id}`);
    const { student } = data;
    setStudent(student);
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  if (!student) {
    return <p>Loadding...</p>;
  }
  const {
    deparetment: { dep_name },
    Student_Course,
  } = student;

  const courseData = Student_Course.map((item) => {
    const {
      courseId,
      studentId,
      course: { course_code, course_name, credit_hour },
    } = item;
    const studentcoures = {
      courseId,
      studentId,
      course_code,
      course_name,
      credit_hour,
    };
    return studentcoures;
  });
  const data = courseData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <div className="wrapper">
      <div className="profile-image">
        <img src={student.picture} alt="img" />
      </div>
      <div className="form-wrapper">
        <form>
          <div className="half-form">
            <article>
              <div>
                <span>First Name</span>
                <input type="text" value={student.first_name} />
              </div>
              <div>
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={student.last_name}
                />
              </div>
              <div>
                <span>Age</span>
                <input type="number" value={student.age} />
              </div>
              <div>
                <span>Sex</span>
                <input type="text" value={student.sex} />
              </div>
            </article>
            <article>
              <div>
                <span>Mobile</span>
                <input type="text" value={student.phone_number} />
              </div>
              <div>
                <span>Program</span>
                <input type="text" value={student.student_TypeId} />
              </div>
              <div>
                <span>Department</span>
                <input type="text" value={dep_name} />
              </div>
            </article>
          </div>
        </form>
      </div>
      <div className="list">
        <p>Course List</p>
        <Table height={300} data={data}>
          <Column width={200} resizable>
            <HeaderCell>Course Id</HeaderCell>
            <Cell dataKey="courseId" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>Course Code</HeaderCell>
            <Cell dataKey="course_code" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>Course Name</HeaderCell>
            <Cell dataKey="course_name" />
          </Column>
          <Column width={200} resizable>
            <HeaderCell>Credit Hour</HeaderCell>
            <Cell dataKey="credit_hour" />
          </Column>
        </Table>
      </div>
    </div>
  );
}

export default Viwe;
