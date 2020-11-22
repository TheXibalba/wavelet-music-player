import React, { useRef, useState } from "react";
import data from "./data";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import Library from "./components/Library";
import Nav from "./components/Nav";
import "input-range-scss";
import Footer from "./components/Footer";

function App({device}) {
  

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  //Timer
 
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
 
  const [libraryStatus,setLibraryStatus]=useState(device);

  //useRef's
  const audioRef = useRef(null);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };
  const songEndHandler=async(e)=>{
    let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
     await setCurrentSong(songs[(currentIndex+1)%songs.length]);

     if(isPlaying){
       audioRef.current.play();
     }
    
  }



  return (
    <div className={`App ${libraryStatus?"library-active":""}`}>
    <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} /> 
    <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
      setSongs={setSongs}
      songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        timeUpdateHandler={timeUpdateHandler}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
      />
      <Library
      setLibraryStatus={setLibraryStatus}
        device={device}
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
      <Footer/>
      <audio
      onEnded={songEndHandler}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
