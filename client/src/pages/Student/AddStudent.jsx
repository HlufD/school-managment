import { postRequest } from "../../utils/apiHelperMethodes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../app/feauters/modal/modalSlice";
import { useState } from "react";
import { addStudent } from "../../app/feauters/student/studentSlice";
import("../../styles/students.scss");

const initialValues = {
  first_name: "",
  last_name: "",
  age: "",
  sex: "",
  phone_number: "",
  student_TypeId: "",
  departmentId: "",
  picture: "",
};

function AddStudent() {
  const { departments } = useSelector((store) => store.Department);
  const { types } = useSelector((store) => store.OthersStates);
  const [student, setStudent] = useState(initialValues);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setStudent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setStudent((prev) => {
      return { ...prev, picture: file };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("first_name", student.first_name);
    formData.append("last_name", student.last_name);
    formData.append("age", student.age);
    formData.append("sex", student.sex);
    formData.append("phone_number", student.phone_number);
    formData.append("student_TypeId", student.student_TypeId);
    formData.append("departmentId", student.departmentId);

    if (file) {
      formData.append("picture", file);
    }
    const data = await postRequest(
      "http://localhost:5000/api/students",
      formData
    );
    if (data["errorType"]) {
      toast.error(data["message"]);
    }
    if (!data["errorType"]) {
      toast.success(data["message"]);
      const { student } = data;
      dispatch(addStudent(student));
      dispatch(close());
    }
  };

  return (
    <div>
      <div className="wrapper-student">
        <form onSubmit={onSubmit}>
          <div className="add-student">
            <article>
              <div>
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  value={student.first_name}
                  name="first_name"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={student.last_name}
                  name="last_name"
                  id=""
                />
              </div>
              <div>
                <input
                  required
                  type="number"
                  placeholder="Age"
                  onChange={handleChange}
                  value={student.age}
                  name="age"
                  id=""
                />
              </div>
              <div>
                <input
                  required
                  type="text"
                  placeholder="sex"
                  onChange={handleChange}
                  value={student.sex}
                  name="sex"
                  id=""
                />
              </div>
            </article>
            <article>
              <div>
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  value={student.phone_number}
                  name="phone_number"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <select
                  value={student.student_TypeId}
                  name="student_TypeId"
                  onChange={handleChange}
                >
                  {types.map((program) => {
                    return (
                      <option key={program.type_code} value={program.type_code}>
                        {program.type_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select
                  value={student.departmentId}
                  onChange={handleChange}
                  name="departmentId"
                >
                  {departments.map((program) => {
                    return (
                      <option key={program.dep_code} value={program.dep_code}>
                        {program.dep_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <input
                  required
                  type="file"
                  placeholder="Picture"
                  onChange={onChangeFile}
                  name="picture"
                  id=""
                />
              </div>
            </article>
          </div>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
