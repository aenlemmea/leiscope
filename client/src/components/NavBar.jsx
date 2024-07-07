import Lens from "../assets/images/lens.png";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="nav-div">
      <nav>
        <img src={Lens} className="logo" />
      </nav>
      <h1>LEISCOPE</h1>

      <div className="search-box">
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
