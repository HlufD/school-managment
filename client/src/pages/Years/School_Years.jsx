import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "rsuite";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { deleteRequest, fetchRequest } from "../../utils/apiHelperMethodes";
import {
  setSchool_Year,
  removeScool_yeas,
} from "../../app/feauters/other/otherSlice";
import Modal from "../../components/Modal";
import AddSchool_years from "./AddSchool_years";
import EditSchool_years from "./EditSchool_years";
import { open } from "../../app/feauters/modal/modalSlice";
const { Column, HeaderCell, Cell } = Table;
import { toast } from "react-toastify";

const URL_SCHOOL = "http://localhost:5000/api/school_years";

function School_Years() {
  const dispatch = useDispatch();
  const { school_years } = useSelector((store) => store.OthersStates);
  const { isOpend, openFor } = useSelector((store) => store.Modal);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [id, setId] = useState("");

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  // fetching data
  const fetchAll = async () => {
    const school_years = await fetchRequest(URL_SCHOOL);
    dispatch(setSchool_Year({ school_years: school_years.school_Years }));
  };

  useEffect(() => {
    fetchAll();
  }, []);
  //
  const openMap = new Map([
    ["Add-School-Year", <AddSchool_years />],
    ["Edit-School-Year", <EditSchool_years id={id} />],
  ]);

  const onAddSchool_Year = () => {
    dispatch(open("Add-School-Year"));
  };

  const onEdit = (id) => {
    dispatch(open("Edit-School-Year"));
    setId(id);
  };

  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this School Year"
    );
    if (userResponse) {
      const data = await deleteRequest(
        "http://localhost:5000/api/school_years",
        id
      );
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeScool_yeas({ id }));
      toast.success(data["message"]);
    }
  };

  const data = school_years.filter((v, i) => {
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
          <button onClick={onAddSchool_Year} className="button">
            Add Course
          </button>
        </div>
      </header>
      <Table height={300} data={data}>
        <Column width={200} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>Year</HeaderCell>
          <Cell dataKey="year_name" />
        </Column>
        <Column width={200} fixed>
          <HeaderCell>Starting Date</HeaderCell>
          <Cell dataKey="startring_date" />
        </Column>
        <Column width={200} fixed>
          <HeaderCell>Eend of Year</HeaderCell>
          <Cell dataKey="end_date" />
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
            {(school_Year) => (
              <FaTrash
                className="delete icon"
                onClick={() => onDelete(school_Year.id)}
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
          total={school_years.length}
          limitOptions={[5, 10]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      {isOpend && <Modal children={openMap.get(openFor)} title={openFor} />}
    </div>
  );
}

export default School_Years;
