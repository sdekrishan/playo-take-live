import "./Styles/Home.css";
import Sidebar from "../Components/Sidebar";
import FilterComponent from "../Components/FilterComponent";
import Eventbar from "../Components/Eventbar";

const Home = () => {

  return (
    <>
      <Sidebar />
      <div className="maindiv">
        <div className="postdiv">
          <Eventbar />
        </div>
        <div className="chatdiv">
          <FilterComponent />
        </div>
      </div>
    </>
  );
};

export default Home;