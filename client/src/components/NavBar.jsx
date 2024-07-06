import Lens from "../assets/images/lens.png";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="nav-div">
      <nav>
        <img src={Lens} />
      </nav>
      <h1>LEISCOPE</h1>
    </div>
  );
}
