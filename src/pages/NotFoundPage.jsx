import { Link } from "react-router-dom";

import Header from "../components/Header/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header text="404 page not found" backButton={true} />
      <main>
        <div className="button-wrapper">
          <button>
            <Link to="/programs">back to home</Link>
          </button>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
