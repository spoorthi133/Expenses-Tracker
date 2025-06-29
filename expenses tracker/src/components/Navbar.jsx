// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>💸 Expenses Tracker</h2>
      
  
    <ul>
    <li><Link to="/analytics">Analytics</Link></li>
 <li>  <Link to="/category">Filter by Category</Link></li> 

    </ul>
      </nav>
  );
}

export default Navbar;
