import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './pages/service';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Header from "./component/Header"
import Footer from "./component/Footer"
import About from './pages/About';

function App() {
  return (

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;