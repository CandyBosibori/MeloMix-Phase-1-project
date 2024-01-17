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

// play previous song
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}

// playy next song 
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}

// Play or pause button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

// Prev music button event
prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

// Next music button event
nextBtn.addEventListener("click", ()=>{
    nextMusic();
});

// Update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // this will get the totall duration og the song being played
    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", ()=>{
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
// this will display how many minutes have been listened to so far
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

