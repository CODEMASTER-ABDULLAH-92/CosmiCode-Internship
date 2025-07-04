import { createContext, useEffect, useState } from "react";
import axios from "axios";



// Create Context
export const ContextApi = createContext();

// Provider Component
const ContextProvider = (props) => {
  const url = "https://task-managment-app-backend.vercel.app";
  const [note, setNotes] = useState([]);


  // Fetch all notes from backend
  const fetchAllNotes = async () => {
    try {
      const response = await axios.get(`${url}/api/notes/getAllNotes/`);
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("❌ Error in getting Notes:", error);
    }
  };

  
  useEffect(() => {
    fetchAllNotes();
  }, []);

  // Pass everything into context
  const value = {
    url,           // ✅ Make sure URL is accessible from other components
    note,
    setNotes,
    fetchAllNotes,
  };

  return (
    <ContextApi.Provider value={value}>
      {props.children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
