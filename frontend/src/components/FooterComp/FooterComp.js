import "./FooterComp.css";

function FooterComp() {
  return (
    <footer className="footer">
      <p>Garatimbi, Copyright &copy; 2022 develop by Joan Kouloumba</p>
      <div>
        <ul className="social-media">
          <li>
            <a
              href="https://www.linkedin.com/in/joan-kouloumba-570a7680/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/joanKouloumba"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jokoul"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
        </ul>
        <p>
          <a href="https://joan-kouloumba.in/professional-site/index.html#achievements">
            Visit more site like this on the professional site.
          </a>
        </p>
      </div>
    </footer>
  );
}

export default FooterComp;
