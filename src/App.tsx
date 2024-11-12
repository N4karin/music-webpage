import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import { useTheme } from './components/ThemeContext';
import Navbar from './components/Navbar';
import './styles/globals.css'; // Make sure this imports the Google Font
import ThemeBtn from './components/ThemeBtn';

const App: React.FC = () => {

  const { theme } = useTheme();

  return (
    <div className={`bg-gradient-to-tr ${theme === 'light' ? 'from-[#A7C6ED] to-[#B9E4C9]' : 'from-[#1b3a4f] to-[#2b1a3c]'} text-black dark:text-gray-300 h-full`}>
      <div className="flex h-screen p-4 md:p-6 lg:p-8">
        <div className={`flex h-full w-full ${theme === 'light' ? 'bg-[#FAF9F6] text-black' : 'bg-gray-900'} bg-opacity-50 rounded-xl overflow-hidden relative`}>
          <div className='absolute top-4 right-4'>
            <ThemeBtn />
          </div>
          <Navbar />
          <div className="flex-grow p-4 md:p-6 lg:p-8 overflow-auto -z-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;
