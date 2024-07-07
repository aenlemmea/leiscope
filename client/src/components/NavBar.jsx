import Lens from "../assets/images/lens.png";
import "./NavBar.css";


export default function NavBar() {
<<<<<<< HEAD
  return (
    <div className="nav-div">
      <nav>
        <img src={Lens} />
      </nav>
      <h1>LEISCOPE</h1>
    </div>
  );
=======
     return (
        <div className="nav-div">
             <nav>
            <img src={Lens} className="logo"/>
            </nav>
            <h1>LEISCOPE</h1>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Movie</li>
                <li>Latest Movie</li>
            </ul>

            <div className="search-box">
                <input type="text"placeholder="search" />
            </div>
        </div>
)
    
>>>>>>> 0311a0989e6d8a957851bba42f03f7e1506e81be
}
