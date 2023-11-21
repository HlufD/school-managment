import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import { FaTrash, FaRegEdit } from "react-icons/fa";
import Modal from "../../components/Modal";
import AddLevel from "./AddLevel";
import EditLevel from "./EditLevel";
import { toast } from "react-toastify";
import { deleteRequest, fetchRequest } from "../../utils/apiHelperMethodes";
import { open } from "../../app/feauters/modal/modalSlice";
import { removeLevel, setLevels } from "../../app/feauters/other/otherSlice";

function Levels() {
  const { levels } = useSelector((store) => store.OthersStates);
  const { openFor, isOpend } = useSelector((store) => store.Modal);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  // mapping the open modal with componentes
  const openMap = new Map([
    ["Add-level", <AddLevel />],
    ["Edit-level", <EditLevel id={id} />],
  ]);
  // fetching levels
  const fetchLevels = async () => {
    const data = await fetchRequest("http://localhost:5000/api/levels");
    const { leveles } = data;
    dispatch(setLevels(leveles));
  };

  // event handlers
  const onAddLevels = () => {
    dispatch(open("Add-level"));
  };

  const onEdit = (id) => {
    dispatch(open("Edit-level"));
    setId(id);
  };

  const onDelete = async (id) => {
    const userResponse = window.confirm(
      "Are you sure ? you want to remove this Course"
    );
    if (userResponse) {
      const data = await deleteRequest("http://localhost:5000/api/levels", id);
      if (data["errorType"]) {
        toast.error(data["message"]);
      }
      dispatch(removeLevel({ id }));
      toast.success(data["message"]);
    }
  };

  console.log(levels);

  const data = levels.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    fetchLevels();
  }, [dispatch]);
  return (
    <div className="list">
      <header className="course-header">
        <div className="search">
          <input type="text" placeholder="search" />
        </div>
        <div className="button-container">
          <button onClick={onAddLevels} className="button">
            Add Levels
          </button>
        </div>
      </header>
      <Table height={300} data={data}>
        <Column width={200} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>Level</HeaderCell>
          <Cell dataKey="level" />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Edit</HeaderCell>
          <Cell>
            {(level) => (
              <FaRegEdit
                className="edit icon"
                onClick={() => onEdit(level.id)}
              />
            )}
          </Cell>
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            {(level) => (
              <FaTrash
                className="delete icon"
                onClick={() => onDelete(level.id)}
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
          total={levels.length}
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

export default Levels;
