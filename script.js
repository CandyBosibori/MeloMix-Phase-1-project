// INTARACTIVITY :)
// Calling the elements
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
  closemoreMusic = musicList.querySelector("#close"),
  commentForm = document.getElementById('comment-form'),
  commentsContainer = document.getElementById('comments');

let allMusic;
let musicIndex = 1; // Default index
let isMusicPaused = true;

// Fetching the data from the JSON file
fetch('http://localhost:3000/allSongs')
  .then(response => response.json())
  .then(data => {
    allMusic = data.allSongs;
    musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
    isMusicPaused = true;
    window.addEventListener("load", () => {
      loadMusic(musicIndex);
      fetchComments(musicIndex);
    });
  });

// Load the song
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name
  musicArtist.innerText = allMusic[indexNumb - 1].artist
  musicImg.src = `images/${allMusic[indexNumb - 1].img}`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.m4a`;

  // Fetch and display comments for the current song
  fetchComments(indexNumb);
}

// Fetch and display comments for a particular song
function fetchComments(songIndex) {
  commentsContainer.innerHTML = ''; // Clear existing comments

  const apiUrl = `http://localhost:3000/allSongs/${songIndex}/comments`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(comments => {
      comments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `${comment} 
          <span class="delete-btn" onclick="deleteComment(this, ${songIndex})">Delete</span>`;

        commentsContainer.appendChild(newComment);
      });
    })
    .catch(error => console.error('Error fetching comments:', error));
}

// Play music function
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// Pause music function
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// Play or pause button event
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

// Prev music button event
prevBtn.addEventListener("click", () => {
  prevMusic();
});

// Next music button event
nextBtn.addEventListener("click", () => {
  nextMusic();
});

// Update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  // ... (existing code)

  // Fetch and display comments for the current song
  fetchComments(musicIndex);
});

// Comment form submission event
commentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const commentInput = document.getElementById('comment');
  const comment = commentInput.value;

  if (comment.trim() !== '') {
    // Create a new comment element
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `${comment} 
        <span class="delete-btn" onclick="deleteComment(this, ${musicIndex})">Delete</span>`;

    // Append the new comment to the comments container
    commentsContainer.appendChild(newComment);

    // Clear the form input
    commentInput.value = '';

    // Add the comment to the server
    postComment(comment, musicIndex);
  }
});

// Function to delete a comment
function deleteComment(deleteButton, songIndex) {
  const commentElement = deleteButton.parentNode;
  commentsContainer.removeChild(commentElement);

  // Delete the comment on the server
  deleteCommentAPI(songIndex);
}

// Function to make a POST request and add a comment to the API
function postComment(comment, songIndex) {
  const apiUrl = `http://localhost:3000/allSongs/${songIndex}/comments`;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  })
    .then(response => response.json())
    .then(data => console.log('Comment added:', data))
    .catch(error => console.error('Error adding comment:', error));
}

// Function to make a DELETE request and remove a comment from the API
function deleteCommentAPI(songIndex) {
  const apiUrl = `http://localhost:3000/allSongs/${songIndex}/comments`;

  fetch(apiUrl, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => console.log('Comment deleted:', data))
    .catch(error => console.error('Error deleting comment:', error));
}
