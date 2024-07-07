import "./App.css";
import NavBar from "./components/NavBar";
import VideoCard from "./components/VideoCard";
import ThumbNail from "./assets/images/thumbnail.webp";
import BoyHeron from "./assets/images/boyheron.jpg";
import Fog from "./assets/images/fog.jpg";
import Jungle from "./assets/images/jungle.jpg";
import Sin from "./assets/images/sin.jpg";
// TODO: Figure out why container spacing is not working as expected. Then remove the ugly sx hack in grid.
// TODO: Fix the grid layout so that the spacing between the cards is consistent and zooming out too much doesn't break the view. Currently it does break it.
// TODO: Remove all the image import after setting up the database. Currently only just testing.
// TODO: Experiment with grid layouts. Either with Material UI or just css and see if something other than flexbox works and looks good enough. Currently the cards look too fat.
function App() {
  return (
    <>
      <div>
        <NavBar />
        <div className="grid-leiscope">
          <VideoCard
            title="The First Omen"
            author="Arkasha Stevenson"
            imageURL={ThumbNail}
            height="400px"
          />
          <VideoCard
            title="Sinchan: Kung Fu Boys"
            author="Wataru Takahashi"
            imageURL={Sin}
            height="400px"
          />
          <VideoCard
            title="The Boy and The Heron"
            author="Hayao Miyazaki"
            imageURL={BoyHeron}
            height="400px"
          />
          <VideoCard
            title="The Fog"
            author="Rupert Wainwright"
            imageURL={Fog}
            height="400px"
          />
          <VideoCard
            title="The Jungle Bunch 2"
            author="Yannick Moulin & Benoit Somville"
            imageURL={Jungle}
            height="400px"
          />
        </div>
      </div>
    </>
  );
}

export default App;
