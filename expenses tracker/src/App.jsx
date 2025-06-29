// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Navbar'; // 👈 Import your Navbar here
import Analytics from './pages/Analytics'; 
import CategoryFilter from './pages/CategoryFilter';

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <Navbar /> {/* 👈 Navbar stays visible on all pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
           <Route path="/analytics" element={<Analytics />} />
          {/* You can add more routes here */}
          <Route path="/category" element={<CategoryFilter />} />
        </Routes>
      </div>
    </ExpenseProvider>
  );
}

export default App;
