const tabsBtn = Array.from(document.querySelectorAll(".nav-tabs__btn"));
const tabsItems = Array.from(document.querySelectorAll(".main__block"));

let authorIndex = 0;

tabsBtn.forEach((item) => {
	item.addEventListener("click", function () {
		let currentBtn = item;

		if (!currentBtn.classList.contains("active")) {
			tabsBtn.forEach((item) => {
				item.classList.remove("active");
			});

			currentBtn.classList.add("active");
		}

		authorIndex = tabsBtn.indexOf(item);

		if (authorIndex == 0) {
			songsIndex = 0;
			loadSong(songsMiyagi[songsIndex]);
			playSong();
		} else if (authorIndex == 1) {
			songsIndex = 0;
			loadSong(songsMax[songsIndex]);
			playSong();
		} else {
			songsIndex = 0;
			loadSong(songsVictor[songsIndex]);
			playSong();
		}
	});
});

// Get names author

let names = tabsBtn.map((name) => {
	let element = name.querySelector(".nav-tabs__btn span");
	return element.innerHTML.toLocaleLowerCase();
});

// Player

const musicContainer = document.querySelector(".music");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressLine = document.querySelector(".progress__line");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Songs title
const songsMiyagi = ["colors", "brooklyn", "marlboro", "патрон",
	"tantra", "родная пой"];
const songsMax = ["малиновый закат", "малый повзрослел",
	"пьяный дождь"];
const songsVictor = ["группа крови", "звезда по имени солнце",
	"хочу перемен"];

// Keep track of songs

let songsIndex = 0;

// Initially load song info DOM
loadSong(songsMiyagi[songsIndex]);

// Update song details

function loadSong(song) {
	console.log(authorIndex);
	title.innerText = `${names[authorIndex]} - ${song}`;
	if (names[authorIndex]) {
		audio.src = `music/${names[authorIndex]}/${song}.mp3`;
		cover.src = `img/${names[authorIndex]}/${song}.jpg`;
	}
}

function playSong() {
	musicContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");

	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");

	audio.pause();
}

function prevSong(name) {
	songsIndex--;

	if (songsIndex < 0) {
		songsIndex = name.length - 1;
	}

	loadSong(name[songsIndex]);

	playSong();
}

function nextSong(name) {
	songsIndex++;

	if (songsIndex > name.length - 1) {
		songsIndex = 0
	}

	loadSong(name[songsIndex]);

	playSong();
}

function updateProgress(event) {
	const { duration, currentTime } = event.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progressLine.style.width = `${progressPercent}%`;
}

function setProgress(event) {
	const width = this.clientWidth;
	const clickX = event.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

function examinationAuthor(name) {
	if (authorIndex == 0) {
		name(songsMiyagi);
	} else if (authorIndex == 1) {
		name(songsMax);
	} else {
		name(songsVictor);
	}
}

// Event listener
playBtn.addEventListener("click", function (event) {
	const isPlaying = musicContainer.classList.contains("play");

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song events
prevBtn.addEventListener("click", () => examinationAuthor(prevSong));
nextBtn.addEventListener("click", () => examinationAuthor(nextSong));

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", () => examinationAuthor(nextSong));

progress.addEventListener("click", setProgress);