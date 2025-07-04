import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Notes from './pages/Notes';
import Update from './pages/Update';
import Footer from './Components/Footer';


const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-black to-green-900">
      {/* Main content area */}
      <main className="flex-grow px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/notes/:id" element={<Notes />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;