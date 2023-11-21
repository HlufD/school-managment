import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { deleteRequest, fetchRequest } from "../../utils/apiHelperMethodes";
import { removeTypes, setTypes } from "../../app/feauters/other/otherSlice";
import AddTypes from "./AddTypes";
import EdiTypes from "./EdiTypes";
import Modal from "../../components/Modal";
import { open } from "../../app/feauters/modal/modalSlice";
import { toast } from "react-toastify";

function Student_Types() {
  const { types } = useSelector((store) => store.OthersStates);
  const { openFor, isOpend } = useSelector((store) => store.Modal);
  const dispatch = useDispatch();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [id, setId] = useState("");

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  // mapping the open modal with componentes
  const openMap = new Map([
    ["Add-program", <AddTypes />],
    ["Edit-program", <EdiTypes id={id} />],
  ]);

  // fetching Programs
  const fetchPrograms = async () => {
    const data = await fetchRequest("http://localhost:5000/api/student_type");
    const { student_Types } = data;
    dispatch(setTypes(student_Types));
  };

  // event Handlers

  const onAddPrograms = () => {
    dispatch(open("Add-program"));
  };
  const onEdit = (id) => {
    dispatch(open("Edit-program"));
    setId(id);
  };

  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this Program Type?"
    );
    if (userResponse) {
      const data = await deleteRequest(
        "http://localhost:5000/api/student_type",
        id
      );
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeTypes({ id }));
      toast.success(data["message"]);
    }
  };

  const data = types.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    fetchPrograms();
  }, [dispatch]);
  return (
    <div className="list">
      <header className="course-header">
        <div className="search">
          <input type="text" placeholder="search" />
        </div>
        <div className="button-container">
          <button onClick={onAddPrograms} className="button">
            Add Programs
          </button>
        </div>
      </header>
      <Table height={300} data={data}>
        <Column width={200} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>Type </HeaderCell>
          <Cell dataKey="type_name" />
        </Column>
        <Column width={200} fixed>
          <HeaderCell>Type </HeaderCell>
          <Cell dataKey="type_code" />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Edit</HeaderCell>
          <Cell>
            {(programs) => (
              <FaRegEdit
                className="edit icon"
                onClick={() => onEdit(programs.id)}
              />
            )}
          </Cell>
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            {(program) => (
              <FaTrash
                className="delete icon"
                onClick={() => onDelete(program.id)}
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
          total={types.length}
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

export default Student_Types;
