import React from "react";

const LibrarySong = ({ song,songs, setCurrentSong, audioRef, isPlaying, id,setSongs,setLibraryStatus,device }) => {
  const songSelectHandler = async(e) => {
      await  setCurrentSong(song);
    //setting active state of other songs to false

    const newSongs=songs.map((song)=>{
            if(song.id===id){
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
    setLibraryStatus(device?true:false);
    if (isPlaying) {
      audioRef.current.play();
      
    }
  };

  return (
    <div className={`library-song ${song.active?"selected":""}`} onClick={songSelectHandler}>
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
