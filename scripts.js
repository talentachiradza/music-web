const songs = [
  // { title: "Bad Liar", artist: "Imagine Dragons", src: "audio/song1.mp3", duration: "4:00" },
  // { title: "Good Energy🌻Songs", artist: "Tiktok Trending Songs 2023", src: "audio/song2.mp3", duration: "01:57:09" },
  // { title: "Tondosangana Ku Zimbabwe", artist: "Monolised", src: "audio/song3.mp3", duration: "02:08" },
  // { title: "Ndibate ruoko", artist: "Francis and Sabelo", src: "audio/song4.mp3", duration: "05:50" }
];

const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const fileInput = document.getElementById('fileInput');

let currentSongIndex = 0;
let isPlaying = false;

// Load songs into playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => playSong(index)); // Play the clicked song
  playlist.appendChild(li);
});

// Play song from the playlist
function playSong(index) {
  currentSongIndex = index;
  audio.src = songs[currentSongIndex].src; // Load the song source
  audio.play(); // Play the song
  isPlaying = true;
  updatePlayPauseIcon();
  updateSongInfo();
}

function updatePlayPauseIcon() {
  if (isPlaying) {
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function updateSongInfo() {
  const { duration } = songs[currentSongIndex];
  durationEl.textContent = duration;
}

// Play or Pause button
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
      audio.pause();
      isPlaying = false;
  } else {
      audio.play();
      isPlaying = true;
  }
  updatePlayPauseIcon();
});

// Previous song button
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});

// Next song button
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});

// Volume control
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

// Update progress bar and current time
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${minutes}:${seconds}`;
});

// Handle file input for user-uploaded songs
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);  // Create a URL for the uploaded file
    audio.src = fileURL;  // Set the audio source to the uploaded file
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();

    // Update the playlist with the uploaded song
    const li = document.createElement('li');
    li.textContent = file.name;
    li.addEventListener('click', () => {
      audio.src = fileURL;
      audio.play();
      isPlaying = true;
      updatePlayPauseIcon();
    });
    playlist.appendChild(li);
  }
});
