import React,{useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ setSongs, songInfo,setSongInfo,currentSong, isPlaying, setIsPlaying,audioRef,songs,setCurrentSong }) => {
//useEffect
useEffect(()=>{
  const newSongs=songs.map((song)=>{
            if(song.id===currentSong.id){
                return{
                    ...song, 
                    active:true,
                };
            }else{
                    return{
                        ...song,
                        active:false,
                    };
                }
            
        });
    
   
    setSongs(newSongs);
},[currentSong, setSongs, songs]);
  //Handlers

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };



  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

    const skipTrackHandler=(direction)=>{
      let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
      if(direction==="forward"){
        setCurrentSong(songs[(currentIndex+1)%songs.length]);
      }else if(direction==="back"){
        if(currentIndex<=0){

          setCurrentSong(songs[(songs.length-1)]);

        }else{

          setCurrentSong(songs[(currentIndex-1)%songs.length]);
        }

      }
      if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
    };
 
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration || 0}
          onChange={dragHandler}
        />
        <p>{songInfo.duration? getTime(songInfo.duration):"0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={()=>skipTrackHandler("back")} className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
        onClick={()=>skipTrackHandler("forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    
    </div>
  );
};

export default Player;
