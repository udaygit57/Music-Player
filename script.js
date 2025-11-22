let currentSongIndex = 0;
const music = document.querySelector("#audio");

const play = document.querySelector(".play");
const music_name = document.querySelector(".music_name");
const artist_name = document.querySelector(".artist_name");
const disk = document.querySelector(".disk");
const music_slider = document.querySelector(".music_slider");
const slider = document.querySelector(".slider");
const initial_time = document.querySelector(".initial_time");
const final_time = document.querySelector(".final_time");
const previous = document.querySelector(".previous_song");
const next = document.querySelector(".next_song");

play.addEventListener("click", () => {
    if (play.className.includes("pause")) {
        music.play();
    } else {
        music.pause();
    }
    play.classList.toggle("pause");
    disk.classList.toggle("play");
});

const loadSong = (index) => {
    slider.value = 0;
    let song = songs[index];
    currentSongIndex = index;
    music.src = song.Path;
    music_name.innerHTML = song.title;
    artist_name.innerHTML = song.artist;
    disk.style.backgroundImage = `url(${song.cover})`;
    initial_time.innerHTML = "00:00";
    setTimeout(() => {
        slider.max = music.duration;
        final_time.innerHTML = formatTime(music.duration);
    }, 300);
}
loadSong(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

music.addEventListener("timeupdate", () => {
    slider.value = music.currentTime;
    initial_time.textContent = formatTime(music.currentTime);
});

slider.addEventListener("change", () => {
    music.currentTime = slider.value;
});
const playMusic = () => {
    music.play();
    play.classList.remove("pause")
    play.classList.add("play")
};

music.addEventListener("play", () => {
    play.style.borderRadius = "25px";
});
music.addEventListener("pause", () => {
    play.style.borderRadius = "50%";
});
if (music.paused) {
    play.style.borderRadius = "50%";
} else {
    play.style.borderRadius = "25px";
}

previous.addEventListener("click", () => {
    if (currentSongIndex <= 0) {
        currentSongIndex = songs.length - 1;
    } else {
        currentSongIndex--;
    }
    loadSong(currentSongIndex);
    playMusic();
});

next.addEventListener("click", () => {
    if (currentSongIndex >= songs.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex++;
    }
    loadSong(currentSongIndex);
    playMusic();
});

music.addEventListener("ended", () => {
    next.click();
});


