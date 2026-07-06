console.log('Welcome to Spotify');

// Initialize the Variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3')
let songItems = document.querySelectorAll('.songItem');
const myProgressBar = document.querySelector('#myProgressBar');
const masterPlay = document.querySelector('#masterPlay');
let masterSongName = document.querySelector('.masterSongName');
let gif = document.querySelector('#gif');

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"}
]

songItems.forEach((element, i) => {
    element.querySelector('img').src = songs[i].coverPath;
    element.querySelector('.songName').src = songs[i].songName;
})

const makeAllPlays = (() => {
    document.querySelector('.songItemPlay').forEach((e) => {
        e.src = 'play-button-o-svgrepo-com black.svg';
    })
})

// Handle play/pause click
masterPlay.addEventListener('click', (e) => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.src = 'pause-circle-svgrepo-com.svg';
        gif.style.opacity = 1;

        makeAllPlays();
        document.querySelector(songIndex).src = 'pause-circle-svgrepo-com copy.svg';
    }
    else{
        audioElement.pause();
        masterPlay.src = 'play-button-o-svgrepo-com.svg';
        gif.style.opacity = 0;
    
        document.querySelector(songIndex).src = 'play-button-o-svgrepo-com black.svg';
    }
})

// Listen to Events
audioElement.addEventListener('click', (e) => {
    // console.log('timeupdate');
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('link', (e) => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

document.querySelectorAll('.songItemPlay').forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e);
        let clickedIndex = parseInt(e.target.id);
        if(songIndex == clickedIndex){
            if(audioElement.paused){
                audioElement.play();
                e.target.src = 'pause-circle-svgrepo-com copy.svg';
                masterPlay.src = 'pause-circle-svgrepo-com.svg';
                gif.style.opacity = 1;
            }else{
                audioElement.pause();
                e.target.src = 'play-button-o-svgrepo-com black.svg';
                masterPlay.src = 'play-button-o-svgrepo-com.svg';
                gif.style.opacity = 0;
            }
        }else{
            makeAllPlays();
            // console.log(e.target);
            songIndex = clickedIndex;
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();

            e.target.src = 'pause-circle-svgrepo-com copy.svg'
            masterPlay.src = 'pause-circle-svgrepo-com.svg';
            gif.style.opacity = 1;
            masterSongName.innerHTML = songs[songIndex - 1].songName;
        }
    })
})

document.querySelector('#next').addEventListener('click', (e) => {
    if(songIndex >= songs.length){
        songIndex = 1;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerHTML = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex).src = 'pause-circle-svgrepo-com copy.svg';
    masterPlay.src = 'pause-circle-svgrepo-com.svg';
    gif.style.opacity = 0;
    setTimeout(() => {
        gif.style.opacity = 1;
    }, 250);
})