// INTARACTIVITY :)
//calling the elements 
let now_playing = document.querySelector('.now-playing');
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),

closemoreMusic = musicList.querySelector("#close");


// fetching the data from the Json file

fetch('http://localhost:3000/allSongs')
    .then(response => response.json())
    .then(data => {
        allMusic = data;
        musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
        isMusicPaused = true;
        window.addEventListener("load", () => {
            loadMusic(musicIndex);
            playingSong();
        });
    });

    //then load the song 
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name
    musicArtist.innerText= allMusic[indexNumb-1].artist
    musicImg.src = `images/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.m4a`;

}


  // function to play the music
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}


// Pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}