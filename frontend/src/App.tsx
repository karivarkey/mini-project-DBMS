import { useState } from "react";

export default function App() {
  let [x, setX] = useState(10);

  function increment() {
    setX(x + 5);
  }
  return (
    <div className="text-4xl flex flex-col ">
      {x}

      <button className="bg-red-900 p-2" onClick={increment}>
        INCREMENT
      </button>
    </div>
  );
}
