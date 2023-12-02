const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _$ = document.getElementsByClassName.bind(document)

const heading = $("header h2 ");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const playBtn = $(".btn-toggle-play");
const player = $(".player");
const changeBtn = $("#btn-change");

const progress = $("#progress");

const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const playlist = $(".playlist");

const menu = $(".playlist-icon");
const dashboard = $(".dashboard");
const theme = $("#theme");
let index = 0;

const root = document.querySelector(':root');

const THEME_COLOR_LOFI = "#042f64"
const THEME_COLOR_SPEEP_UP = "#d74d1a"

const LOFI_SONGS = [
  {
    id: 1,
    type: "lofi",
    name: "Tại Vì Sao",
    singer: " ❦ MCK",
    path: "./assets/music/song13.mp3",
    img: "./assets/img/MCk.jpg",
  },
  {
    id: 2,
    type: "lofi",
    name: "Cuộc Gọi Đêm",
    singer: " ❦ Uyên Tố...",
    path: "./assets/music/song12.mp3",
    img: "./assets/img/UyenTo.jpg",
  },
  {
    id: 3,
    type: "lofi",
    name: "Crush 2",
    singer: " ❦ W/n...",
    path: "./assets/music/song10.mp3",
    img: "./assets/img/Wn.jpg",
  },
  {
    id: 4,
    type: "lofi",
    name: "Your Smile",
    singer: " ❦ Obito ft hnhngan",
    path: "./assets/music/song5.mp3",
    img: "./assets/img/hnhngan.jpg",
  },
  {
    id: 5,
    type: "lofi",
    name: "Anh Biết",
    singer: " ❦ Xám x D.Blue",
    path: "./assets/music/song11.mp3",
    img: "./assets/img/Xam-1-scaled.jpg",
  },
  {
    id: 6,
    type: "lofi",
    name: "Chìm Sâu",
    singer: " ❦ Tu Salmon",
    path: "./assets/music/song2.mp3",
    img: "./assets/img/TuSalmon.jpg",
  },
  {
    id: 7,
    type: "lofi",
    name: "Mascara",
    singer: " ❦ Chillies",
    path: "./assets/music/song4.mp3",
    img: "./assets/img/Chillies.jpg",
  },
  {
    id: 8,
    type: "lofi",
    name: "Xe Đạp",
    singer: " ❦ Charles",
    path: "./assets/music/song7.mp3",
    img: "./assets/img/Charles.jpg",
  },
  {
    id: 9,
    type: "lofi",
    name: "20 Năm Ở Thế Giới",
    singer: " ❦ Thịnh Suy",
    path: "./assets/music/song8.mp3",
    img: "./assets/img/ThinhSuy.jpg",
  },
  {
    id: 10,
    type: "lofi",
    name: "Có Hẹn Với Thanh Xuân",
    singer: " ❦ Monstar",
    path: "./assets/music/song9.mp3",
    img: "./assets/img/Monstar.jpg",
  },
  {
    id: 11,
    type: "lofi",
    name: "Tiny love",
    singer: " ❦ Thịnh Suy",
    path: "./assets/music/song1.mp3",
    img: "./assets/img/ThinhSuy.jpg",
  },
  {
    id: 12,
    type: "lofi",
    name: "Mơ",
    singer: " ❦ Vũ Cát Tường",
    path: "./assets/music/song6.mp3",
    img: "./assets/img/VuCatTuong.jpg",
  },

  {
    id: 13,
    type: "lofi",
    name: "Tình yêu xanh lá",
    singer: " ❦ Thịnh Suy",
    path: "./assets/music/song3.mp3",
    img: "./assets/img/ThinhSuy.jpg",
  },
]

const SPEED_UP_SONGS = [
  {
    id: 14,
    type: "speed_up",
    name: "Anh Đã Lạc Vào",
    singer: " ❦ Green",
    path: "./assets/music/anh-da-lac-vao-green.mp3",
    img: "./assets/img/cat1.jpg",
  },
  {
    id: 15,
    type: "speed_up",
    name: "Chỉ Cần Có Em",
    singer: " ❦ Twenty, Darki",
    path: "./assets/music/chi-can-co-em-twenty-darki.mp3",
    img: "./assets/img/cat2.jpg",
  },
  {
    id: 16,
    type: "speed_up",
    name: "Chỉ Cần Có Em",
    singer: " ❦ DMean",
    path: "./assets/music/iu-em-roi-tinh-sao-dmean.mp3",
    img: "./assets/img/cat3.jpg",
  },
  {
    id: 17,
    type: "speed_up",
    name: "Matchanah",
    singer: " ❦ Híu x Bâu",
    path: "./assets/music/matchanah-hiu-bau.mp3",
    img: "./assets/img/cat4.jpg",
  },
  {
    id: 18,
    type: "speed_up",
    name: "Miên Man",
    singer: " ❦ Minh Huy",
    path: "./assets/music/mien-man-minhhuy.mp3",
    img: "./assets/img/cat5.jpg",
  },
  {
    id: 19,
    type: "speed_up",
    name: "Mộng Mơ",
    singer: " ❦ RedT",
    path: "./assets/music/mong-mo-redt.mp3",
    img: "./assets/img/cat6.jpg",
  },
  {
    id: 20,
    type: "speed_up",
    name: "Nụ Cười Em Là Nắng",
    singer: " ❦ Green",
    path: "./assets/music/nu-cuoi-em-la-nang-green.mp3",
    img: "./assets/img/cat7.jpg",
  },
  {
    id: 21,
    type: "speed_up",
    name: "Phỏng Lài Em",
    singer: "❦ Daduc, Dipper",
    path: "./assets/music/phong-lai-em-daduc-dipper.mp3",
    img: "./assets/img/cat8.jpg",
  },
  {
    id: 22,
    type: "speed_up",
    name: "Say Đắm Trong Lần Đầu",
    singer: "❦ Winno",
    path: "./assets/music/say-dam-trong-lan-dau-winno.mp3",
    img: "./assets/img/cat9.jpg",
  },
  {
    id: 23,
    type: "speed_up",
    name: "Tình Cờ Yêu Em",
    singer: "❦ Linh Thộn, Kuun Đức Nam",
    path: "./assets/music/tinh-co-yeu-em.mp3",
    img: "./assets/img/cat10.jpg",
  },
  {
    id: 24,
    type: "speed_up",
    name: "Tình Đơn Phương",
    singer: "❦ Nguyên, Koo",
    path: "./assets/music/tinh-don-phuong-nguyen-koo.mp3",
    img: "./assets/img/cat11.jpg",
  },
  {
    id: 25,
    type: "speed_up",
    name: "Từng Quen",
    singer: "❦ Wren EVans",
    path: "./assets/music/tung-quen-wren-evans.mp3",
    img: "./assets/img/cat12.jpg",
  },
  {
    id: 26,
    type: "speed_up",
    name: "Unfollow",
    singer: "❦ Freaky",
    path: "./assets/music/unfollow-freaky.mp3",
    img: "./assets/img/cat13.jpg",
  },
  {
    id: 27,
    type: "speed_up",
    name: "Gu",
    singer: "❦ Freaky, Seachains",
    path: "./assets/music/gu-freaky-seachains.mp3",
    img: "./assets/img/cat2.jpg",
  },
]

const randomNumber = (max) => Math.floor(Math.random() * max);

let SONGS_RENDER = randomNumber(10) % 2 === 0 ? SPEED_UP_SONGS : LOFI_SONGS;

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
      changeBtn.textContent = isTypeLofi ? "Switching to Lofi" : "Switching to Speed up"
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
    changeBtn.textContent = this.currentSong.type === "lofi" ? "Switching to Lofi" : "Switching to Speed up"
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url("./assets/img/cat-g.gif")`;
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

