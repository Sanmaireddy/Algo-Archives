import "./App.css";
import { useState } from "react";

function App() {
  const [names, setNames] = useState("");

  const handleClick = async () => {
    try {
      const res = await window.api.getNames();
      console.log(res);
      let newNames = res
        .map((elem) => {
          return elem.name;
        })
        .join(",");
      setNames(newNames);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
      <div>{names}</div>
    </>
  );
}

export default App;
