import React, { useState } from "react";
import Counter from "./Component/Counter";

const App = () => {
const [count,setCount] = useState(0);



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <Counter count={count} setCount={setCount} />
    </div>
  );
};

export default App;
