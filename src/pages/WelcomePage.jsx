import { Link } from "react-router-dom";
import "../css/welcome.css";

function WelcomePage() {
  return (
    <main className="welcome-page">
      <div className="shadow-overlay">
        <div className="welcome-wrapper">
          <h1>Welcome to the best fitness app</h1>
          <div className="button-wrapper">
            <Link to="login">
              <button>Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WelcomePage;
