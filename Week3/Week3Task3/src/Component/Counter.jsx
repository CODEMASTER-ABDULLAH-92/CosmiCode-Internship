import React from "react";

const Counter = ({ count ,setCount}) => {

  const incrementCount = () =>{
    setCount(prev => prev + 1);
  }

  const decrementCount = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  }
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-64 text-center">
      <h2 className="text-2xl font-bold mb-4">Counter App</h2>
      <p className="text-4xl font-semibold text-blue-600 mb-6">{count}</p>
      <div className="flex justify-center gap-4">
        <button onClick={decrementCount} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg">
          -
        </button>
        <button onClick={incrementCount} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg">
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
