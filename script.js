console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songCards = Array.from(document.getElementsByClassName('songCard'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "--:--" },
    { songName: "Cielo - Huma -Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "--:--" },
    { songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "--:--" },
    { songName: "Different Heaven & EHIDE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "--:--" },
    { songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "--:--" },
    { songName: "Rabba-salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "--:--" },
    { songName: "Bhuladena-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "--:--" },
    { songName: "Rabba-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "--:--" },
    { songName: "ravgjd-e-sdasf", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "--:--" },
    { songName: "muskit-e-sff", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "--:--" },
];

function formatTime(sec) {
    if (isNaN(sec)) return "--:--";
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}
songs.forEach((song, i) => {
    let tempAudio = new Audio(song.filePath);
    tempAudio.addEventListener('loadedmetadata', () => {
        song.duration = formatTime(tempAudio.duration);
        let timeSpan = document.querySelector(`.songTime[data-index="${i}"]`);
        if (timeSpan) timeSpan.textContent = song.duration;
    });
});
songCards.forEach((element, i) => {
    element.getElementsByClassName("songCover")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songTitle")[0].innerText = songs[i].songName;
    let timeSpan = element.querySelector('.songTime');
    if (timeSpan) timeSpan.textContent = songs[i].duration;
});
function makeAllplays() {
    Array.from(document.getElementsByClassName('songPlayPause')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}
function highlightSongCard(index) {
    songCards.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
function updateCurrentSongTimestamp() {
    let timeSpan = document.querySelector(`.songTime[data-index="${songIndex}"]`);
    if (timeSpan) {
        timeSpan.textContent = `${formatTime(audioElement.currentTime)} / ${songs[songIndex].duration}`;
    }
}
function resetAllTimestamps() {
    document.querySelectorAll('.songTime').forEach((span, i) => {
        if (i !== songIndex) span.textContent = songs[i].duration;
    });
}

// Master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        highlightSongCard(songIndex);
        makeAllplays();
        let playBtn = document.getElementById(songIndex.toString());
        if (playBtn) {
            playBtn.classList.remove('fa-play-circle');
            playBtn.classList.add('fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllplays();
    }
});

// Song card play button
Array.from(document.getElementsByClassName('songPlayPause')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        if (songIndex === clickedIndex && !audioElement.paused) {
            // Pause if the same song is playing
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            makeAllplays();
        } else {
            // Play new song
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            highlightSongCard(songIndex);
            makeAllplays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
        }
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    highlightSongCard(songIndex);
    makeAllplays();
    let playBtn = document.getElementById(songIndex.toString());
    if (playBtn) {
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
    }
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    highlightSongCard(songIndex);
    makeAllplays();
    let playBtn = document.getElementById(songIndex.toString());
    if (playBtn) {
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
    }
});
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    updateCurrentSongTimestamp();
    resetAllTimestamps();
});

// Seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
audioElement.addEventListener('ended', () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    makeAllplays();
    resetAllTimestamps();
});

// Navbar active link

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

highlightSongCard(songIndex);
