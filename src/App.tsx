import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './styles/globals.css'; // Make sure this imports the Google Font

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-tr from-[#2b1a3c] to-[#1b3a4f] text-black dark:text-gray-300 h-full">
      <div className="flex h-screen p-4 md:p-6 lg:p-8">
        <div className="flex h-full w-full bg-black rounded-xl overflow-hidden">
          <Navbar />
          <div className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* Add other routes here */}
            </Routes>
            <h1 className="text-center">I am content.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
