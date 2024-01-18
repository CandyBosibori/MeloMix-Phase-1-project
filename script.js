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

// Update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;
  
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});


moreMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
    moreMusicBtn.click();
});





// Create music list function
function createMusicList() {
    const ulTag = document.querySelector("ul");
fetch('http://localhost:3000/allSongs')
.then(response => response.json())
.then(data => {
      data = allMusic
    for (let i = 0; i < allMusic.length; i++) {
        let liTag = `<li li-index="${i + 1}">
                        <div class="row">
                            <span>${allMusic[i].name}</span>
                            <p>${allMusic[i].artist}</p>
                        </div>
                        <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                        <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.m4a"></audio>
                    </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);
        console.log(allMusic.length)

        let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
        let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
        liAudioTag.addEventListener("loadeddata", () => {
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            }
            liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
            liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        });
    }
})
}
createMusicList()

// Play particular song from the list onclick of li tag
function playingSong(){
    const ulTag = document.querySelector("ul");
    const allLiTag = ulTag.querySelectorAll("li");
  
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");
        
        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
  
        if(allLiTag[j].getAttribute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
  
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

// Particular li clicked function
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

const commentForm = document.getElementById('comment-form');
            const commentsContainer = document.getElementById('comments');

            commentForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const commentInput = document.getElementById('comment');
                const comment = commentInput.value;

                if ( comment.trim() !== '') {
                    // Create a new comment element
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    newComment.id = "addedComment"
                    newComment.innerHTML = `- ${comment} <span id="delete-btn" onclick="deleteComment(this)">X</span>`;

                    // Append the new comment to the comments container
                    commentsContainer.appendChild(newComment);

                    // Clear the form inputs
                    commentInput.value = '';
            //         const deleteComment = document.querySelector('#delete-btn');
            // deleteComment.addEventListener("click", (e)=> {
            //     document.getElementById('addedComment')
            //     e.target 
            // })

                }
            });

            
