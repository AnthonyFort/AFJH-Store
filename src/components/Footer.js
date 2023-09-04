import { Link } from 'react-router-dom'
 
export default function Footer() {
  return (
    <footer>
      &copy; AFJH
      <nav className="footer-nav">
        <Link to="/contact-us" className="footer-link">Contact Us</Link>
        <Link to="/cookie-policy" className="footer-link">Cookie Policy</Link>
      </nav>
    </footer>
  )
}