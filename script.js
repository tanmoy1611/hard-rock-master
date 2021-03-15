const searchSongs=async()=>
{
   const searchSongs=document.getElementById("songsInput").value;
   console.log(searchSongs);
   const url=`https://api.lyrics.ovh/suggest/${searchSongs}`
   console.log(url);
   fetch(url)
   .then(res=>res.json())
   //.then(data=>console.log(data.data))
   .then(data=>displaySongs(data.data))
   .catch(error=>displayError("Something Went Wrong! Please try again"))
//   const res=await fetch(url);
//   const data=await res.json();
//   displaySongs(data.data);
  
}

const displaySongs=songs=>{
    console.log(songs)
    const songContainer=document.getElementById("song-container")
    songContainer.innerHTML=''
    document.getElementById("song-lyrics").innerText=''
    songs.forEach(song => {
       // console.log(song.title);
       const songDiv=document.createElement("div");
       songDiv.className='single-result row align-items-center my-3 p-3'
       songDiv.innerHTML=`      <div class="col-md-9">
       <h3 class="lyrics-name">${song.title}</h3>
       <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
          <source src="${song.preview}" type="audio/ogg">
       </audio>
   </div>
   <div class="col-md-3 text-md-right text-center">
       <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
   </div>`
   songContainer.appendChild(songDiv);
    });
}

const getLyric=async(artist,title)=>{
console.log(artist,title);
const url=` https://api.lyrics.ovh/v1/${artist}/${title}`
//console.log(url)
// fetch(url)
// .then(res=>res.json())
// // .then(data=>console.log(data.lyrics))
// .then(data=>displayLyrics(data.lyrics))

try{
const res=await fetch(url);
const data=await res.json();
displayLyrics(data.lyrics);
}
catch(error){
displayError("Sorry I failed to Load Lyric ! Please try again")
}

}

const displayLyrics=lyrics=>{
    const lyricsDiv=document.getElementById("song-lyrics");
    
    lyricsDiv.innerText=lyrics;
   
}

const displayError=error=>{
    const errorTag=document.getElementById("error");
    errorTag.innerText=error;
}