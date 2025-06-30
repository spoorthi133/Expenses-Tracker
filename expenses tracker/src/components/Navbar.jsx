// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">

         <Link to="/" className="home-link">
  <h1> 💸 Expenses Tracker</h1>
</Link>
      
  
    <ul>
    <li><Link to="/analytics">Analytics</Link></li>
 <li>  <Link to="/category">Filter by Category</Link></li> 

    </ul>
      </nav>
  );
}

export default Navbar;
