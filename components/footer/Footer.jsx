import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="footer-container">
        <div class="footer-section">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Music</a>
            </li>
            <li>
              <a href="#">Playlists</a>
            </li>
            <li>
              <a href="#">Artists</a>
            </li>
            <li>
              <a href="#">Social</a>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h2>Connect With Us</h2>
          <ul class="social-links">
            <li>
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2024 Music & Social Player. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
