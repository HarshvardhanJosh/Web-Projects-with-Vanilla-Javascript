const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


// Play and pause video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    } else if(!video.paused){
        video.pause();
    }
}

// Update play pause icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = ` <i class="fa fa-play fa-2x"></i>`  
    } else{
        play.innerHTML = ` <i class="fa fa-pause fa-2x"></i>`  
    }
}

// update progress and timestamp
function updateProgress(){
    progress.value = (video.currentTime/ video.duration) * 100;

    // Get min
    let mins = Math.floor(video.currentTime/60);
    if(mins < 10){
        mins = '0' + String(mins);
    }
    // Get sec
    let sec = Math.floor(video.currentTime % 60);
    if(sec < 10){
        sec = '0' + String(sec);
    }
    
    timestamp.innerHTML = ` ${mins}:${sec}`;
}

// set video time
function setVideo(){
   video.currentTime = (+progress.value * video.duration)/100;
}

// stop the video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}
// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click',stopVideo);

progress.addEventListener('change', setVideo);




