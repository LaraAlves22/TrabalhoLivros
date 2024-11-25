import "@/styles/Footer.css"

const Footer = () => (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Nome do Site</h2>
          <p>Conectando pessoas e ideias. Transforme o mundo conosco!</p>
        </div>
        <div className="footer-links">
          <h3>Links Úteis</h3>
          <ul>
            <li>
              <a href="#">Sobre Nós</a>
            </li>
            <li>
              <a href="#">Serviços</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Siga-nos</h3>
          <div className="social-icons">
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="https://th.bing.com/th/id/OIP.DWugoLIiK6MIiv5sfToTQQHaHa?rs=1&pid=ImgDetMain" alt="Instagram" />
            </a>
            <a href="#">
              <img src="https://th.bing.com/th/id/OIP.OiRP0Wt_nlImTXz5w45aRQHaHa?rs=1&pid=ImgDetMain" alt="X" />
            </a>
            <a href="#">
              <img src="https://th.bing.com/th/id/OIP.6uTQ7mOjYOD2sNKxUdnaNAHaHa?rs=1&pid=ImgDetMain" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Nome do Site. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
  
  export default Footer;
  