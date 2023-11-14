import { useState } from "react";

import("../styles/Students.scss");

function RegisterStudet() {
  const [count, setCount] = useState(0);
  return (
    <div>
      RegisterStudet
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </div>
  );
}

export default RegisterStudet;
