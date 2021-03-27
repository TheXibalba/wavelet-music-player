import React from 'react';


const Song=({currentSong,isPlaying})=>{
    return(
        <div className="song-container">

<img src={currentSong.cover} alt={currentSong.name} className={`${isPlaying?"rotate-song-img":""}`} ></img>
<h2>{currentSong.name}</h2>
<h3>{currentSong.artist}</h3>
        </div>

    );
}

export default Song;