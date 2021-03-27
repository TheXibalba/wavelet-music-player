import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ libraryStatus,setLibraryStatus,songs, setCurrentSong, audioRef, isPlaying,setSongs,device }) => {
  return (
    <div className={`library ${libraryStatus?"active-library":""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
            device={device}
            setLibraryStatus={setLibraryStatus}
            setSongs={setSongs}
              isPlaying={isPlaying}
              audioRef={audioRef}
              song={song}
              songs={songs}
              setCurrentSong={setCurrentSong}
              key={song.id}
              id={song.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
