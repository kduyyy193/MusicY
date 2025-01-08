import { LOFI_SONGS, SPEED_UP_SONGS, THUMBNS } from './mock.js'
import { THEME_COLOR_LOFI, THEME_COLOR_SPEEP_UP, IMG_GU } from './constants.js'
import { randomNumber } from './utils.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2 ");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const playBtn = $(".btn-toggle-play");
const player = $(".player");
const changeBtn = $("#btn-change");

const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const menu = $(".playlist-icon");
const dashboard = $(".dashboard");
const theme = $("#theme");

const root = document.querySelector(':root');

let SONGS_RENDER = LOFI_SONGS

function initialData() {
  if (randomNumber(10) % 2 === 0) {
    SONGS_RENDER = SPEED_UP_SONGS
    root.style.setProperty('--primary-color', THEME_COLOR_SPEEP_UP);
  }
}
initialData ();

const app = {
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isMenu: false,
  songs: SONGS_RENDER,
  currentIndex: randomNumber(SONGS_RENDER.length),
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div data-index = "${index}" class="song ${index === this.currentIndex ? "active" : ""
        }">
            <div class="thumb" style="background-image: url('${song.img}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
          `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;

    const cdThumbAnimate = cdThumb.animate(
      [
        {
          // transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.hightlightSong();
      _this.scrolltoActiveSong();
    };

    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.hightlightSong();
      _this.scrolltoActiveSong();
    };

    changeBtn.onclick = function () {
      const isTypeLofi = SONGS_RENDER?.[0]?.type === "lofi"
      SONGS_RENDER = isTypeLofi ? SPEED_UP_SONGS : LOFI_SONGS;
      changeBtn.textContent = isTypeLofi ? "Switch to Lofi" : "Switch to Speed up"
      player.style.backgroundImage = isTypeLofi ? `url("./assets/img/bg-2.jpg")` : `url("./assets/img/bg-1.gif")`
      root.style.setProperty('--primary-color', isTypeLofi ? THEME_COLOR_SPEEP_UP : THEME_COLOR_LOFI);
      _this.currentIndex = randomNumber(SONGS_RENDER.length)
      _this.songs = SONGS_RENDER;
      _this.render();
      _this.loadCurrentSong();
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    (playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode) {
        _this.currentIndex = songNode.dataset.index;
        _this.loadCurrentSong();
        _this.hightlightSong();
        audio.play();
      }
      if (_this.isMenu) {
        _this.isMenu = !_this.isMenu;
        dashboard.classList.toggle("display-none");
        theme.classList.toggle("display-none");
        playlist.classList.toggle("display-block");
        menu.classList.toggle("display-none", _this.isMenu);
        menu.animate({ opacity: 1 });
        playlist.style.width = "30vw";
      }
    }),
      (menu.onclick = function () {
        _this.isMenu = !_this.isMenu;
        _this.hightlightSong();
        _this.scrolltoActiveSong();
        dashboard.classList.toggle("display-none");
        theme.classList.toggle("display-none");
        playlist.classList.toggle("display-block");
        menu.classList.toggle("display-none", _this.isMenu);
        playlist.style.width = "100vw";
      });
  },
  loadCurrentSong: function () {
    const myId = this.currentSong.id === 27
    changeBtn.textContent = this.currentSong.type === "lofi" ? "Switch to Speed up" : "Switch to Lofi"
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = myId ? `url(${IMG_GU})` : `url(${THUMBNS[randomNumber(THUMBNS.length)]})`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  hightlightSong: function () {
    let songBlock = $$(".song");
    for (var i = 0; i < songBlock.length; i++) {
      songBlock[i].classList.remove("active");
    }
    songBlock[this.currentIndex].classList.add("active");
  },
  scrolltoActiveSong: function () {
    setTimeout(function () {
      $(".active").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 250);
  },
  start: function () {
    this.defineProperties();

    this.handleEvent();

    this.loadCurrentSong();

    this.render();
  },
};
app.start();

