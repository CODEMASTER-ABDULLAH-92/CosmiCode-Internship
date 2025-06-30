import React, { useState } from "react";
import Counter from "./Component/Counter";

const App = () => {
const [count,setCount] = useState(0);



  return (
    <div className="flex items-center justify-center flex-col  gap-5 min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <h1 className="text-3xl">CosmiCode Counter App</h1>
      <Counter count={count} setCount={setCount} />
    </div>
  );
};

export default App;
