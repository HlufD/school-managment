function ViweCourse() {
  return (
    <div className="add-course-form">
      <h5>Viwe course</h5>
      <>
        <form>
          <div>
            <input type="text" placeholder="Course Name" />
          </div>
          <div>
            <input type="text" placeholder="Course Code" />
          </div>
          <div>
            <input type="number" placeholder="Credit Hour" />
          </div>
        </form>
      </>
    </div>
  );
}

export default ViweCourse;
