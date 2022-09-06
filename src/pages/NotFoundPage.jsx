import { Link } from "react-router-dom";

import Header from "../components/Header";

const NotFoundPage = () => {
    return (
        <>
            <Header text="404 page not found" backButton={true} />
            <main>
                <div className="button-wrapper">
                    <button>
                        <Link to="/">back to home</Link>
                    </button>
                </div>
            </main>
        </>
    );
};

export default NotFoundPage;
