// Cache DOM Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// FUNCTIONS
// toggleplay Function
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// updateButton Function
function updateButton() {
    // Icon change/toggle depending on state before click event
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

// skip Function
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// handleRangeUpdate Function
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// handleProgress Function
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// scrub Function
function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// EVENT LISTENERS
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Flag variable and event listeners for scrub function - if mouse is pressed down, scrub to video time hovered over
let mousedown = false;
progress.addEventListener('click', scrub);
// Cool syntax - where if mousedown is true, scrub function will run, otherwise it won't
progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);