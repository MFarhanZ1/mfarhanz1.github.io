// list surah sebelah kiri
const listSurah = document.getElementById("list-surah");

fetch("https://equran.id/api/v2/surat")
	.then((response) => response.json())
	.then((data) => {
		data.data.map((surah) => {
			let cardSurah = document.createElement("div");
			cardSurah.innerHTML = `
            <!-- card each surah listed -->
            <div onclick="onClickSurah(this, ${surah.nomor})" id="surah-${surah.nomor}" class="h-20 w-full flex items-center gap-4 rounded-xl p-4 bg-blur-lg shadow-lg border-x border-y border-antique-blue cursor-pointer hover:bg-white-warm active:-skew-y-3">
                <div
                    class="relative flex items-center justify-center text-violet-600 row-start-1 row-end-3"
                >
                    <svg
                        width="53"
                        height="47"
                        viewBox="0 0 38 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.3036 2.10426C18.0868 0.850113 19.9132 0.850113 20.6964 2.10426L24.5063 8.20509C25.2111 9.33361 26.4309 10.0378 27.7606 10.0839L34.949 10.333C36.4267 10.3842 37.3399 11.9659 36.6454 13.2712L33.2669 19.6212C32.642 20.7958 32.642 22.2042 33.2669 23.3788L36.6454 29.7288C37.3399 31.0341 36.4267 32.6158 34.949 32.667L27.7606 32.9161C26.4309 32.9622 25.2111 33.6664 24.5063 34.7949L20.6964 40.8957C19.9132 42.1499 18.0868 42.1499 17.3036 40.8957L13.4937 34.7949C12.7889 33.6664 11.5691 32.9622 10.2394 32.9161L3.05099 32.667C1.57325 32.6158 0.660093 31.0341 1.35461 29.7288L4.7331 23.3788C5.35804 22.2042 5.35805 20.7958 4.7331 19.6212L1.35461 13.2712C0.660093 11.9659 1.57325 10.3842 3.05099 10.333L10.2394 10.0839C11.5691 10.0378 12.7889 9.33361 13.4937 8.20509L17.3036 2.10426Z"
                            stroke="currentColor"
                            stroke-width="1"
                        ></path>
                    </svg>
                    <span
                        class="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-2xl"
                        >${convertToArabicNumeric(surah.nomor)}</span
                    >
                </div>

                <div>
                    <h1 class="font-merriweather text-xl font-black text-antique-blue bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600">${surah.namaLatin} <span>(${surah.nama})</span></h1>
                    <p class="font-merriweather text-md font-medium text-antique-blue">${surah.arti} - <span class="italic">${surah.jumlahAyat} ayat</span></p>
                </div>
            </div>  
            `;

			listSurah.appendChild(cardSurah);
		});

		document.getElementById("surah-1").click();
	});

let docTitleOri = document.title;
let lastClickedElement = null;

const onClickSurah = (element, noSurah) => {
	// Jika ada elemen yang terakhir diklik, kembalikan kelasnya
	if (lastClickedElement) {
		lastClickedElement.classList.remove("hover:bg-white-warm");
		lastClickedElement.classList.remove("bg-gradient-to-r");
		lastClickedElement.classList.remove("from-indigo-500/20");
		lastClickedElement.classList.remove("via-purple-500/20");
		lastClickedElement.classList.remove("to-pink-500/20");
	}

	// Tambahkan kelas ke elemen yang baru diklik
	element.classList.toggle("hover:bg-white-warm");
	element.classList.toggle("bg-gradient-to-r");
	element.classList.toggle("from-indigo-500/20");
	element.classList.toggle("via-purple-500/20");
	element.classList.toggle("to-pink-500/20");

	// Set elemen yang baru diklik sebagai lastClickedElement
	lastClickedElement = element;

	document.title = `${
		element.querySelector("h1").textContent
	} | ${docTitleOri}`;

	fetchDetailAyat(noSurah)
		.then((response) => response.data)
		.then((surat) => {
			infoTitleSurah.textContent = `${surat.namaLatin} - ${surat.nama}`;
			infoDetailSurah.textContent = `${surat.arti} - ${surat.jumlahAyat} ayat - ${surat.tempatTurun}`;
            
            let nomorSurah = surat.nomor;
            let namaSurah = surat.namaLatin;

            detailAyatSurah.innerHTML = "";
            listSelectAyat.innerHTML = "";

            surat.ayat.map((ayat) => {
                let cardAyat = document.createElement("div");
                cardAyat.classList.add(
                    'flex',
                    'flex-col',
                    'gap-8',
                    'border-b',
                    'border-antique-blue',
                    'pb-4'
                );
                cardAyat.id = `s${nomorSurah}-${ayat.nomorAyat}`;

                cardAyat.innerHTML = `

                    <div class="flex gap-3 justify-end">
                        <h1 class="font-amiri text-4xl text-end leading-loose">${ayat.teksArab}</h1>
                        <p class="text-xl underline font-semibold">${convertToArabicNumeric(ayat.nomorAyat)}</p>
                    </div>
                    <div>
                        <p class="font-merriweather text-md text-antique-blue font-semibold mb-2">${ayat.teksLatin}</p>
                        <p class="font-merriweather text-md font-medium text-black">${ayat.teksIndonesia}</p>
                        <div class="mt-4">
                            <audio id="audio${nomorSurah}-${ayat.nomorAyat}">
                                <source src="${ayat.audio[localStorage.getItem("qari")]}" type="audio/mp3">
                                Your browser does not support the audio element.
                            </audio>
                            <img onclick="document.getElementById('audio${nomorSurah}-${ayat.nomorAyat}').play();" src="../../assets/svgs/voice-activate-svgrepo-com.svg" class="w-10 h-10 mt-4 hover:scale-110 active:skew-y-12 cursor-pointer">
                        </div>
                        <p class="font-amiri mt-4">QS. ${namaSurah} Ayat ${ayat.nomorAyat}</p>
                    </div>
                `;
                detailAyatSurah.appendChild(cardAyat);

                let option = document.createElement("option");
                option.value = `#s${nomorSurah}-${ayat.nomorAyat}`;
                option.textContent = `ayat ke-${ayat.nomorAyat}`;
                listSelectAyat.appendChild(option);
            })

            listSelectAyat.selectedIndex = 0;
            scrollToAyat();
		});
};

// =============================================================================

// detail ayat dari surat yang dipilih
const infoTitleSurah = document.getElementById("info-title-surah");
const infoDetailSurah = document.getElementById("info-detail-surah");
const listSelectAyat = document.getElementById("list-select-ayat");
const listSelectQari = document.getElementById("list-select-qari");

const detailAyatSurah = document.getElementById("detail-ayat-surah");

const fetchDetailAyat = async (noSurah) => {
	const url = `https://equran.id/api/v2/surat/${noSurah}`;

	const response = await fetch(url);
	return await response.json();
};

function scrollToAyat() {
	const selectElement = document.getElementById("list-select-ayat");
	const selectedValue = selectElement.value;
	if (selectedValue) {
		// Scroll to the element with the ID specified in the selected value
		const targetElement = document.querySelector(selectedValue);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	}
}



function convertToArabicNumeric(number) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(digit => arabicNumbers[digit]).join('');
}

function replaceAudioWithNewQari(res) {
    var qari = res.options[res.selectedIndex].text;
    var audioElements = document.querySelectorAll('audio');

    audioElements.forEach(audio => {
        var source = audio.querySelector('source');
        if (source) {
            const newSrc = source.src.replace(/audio-partial\/[^\/]+\//, `audio-partial/${qari}/`);
            source.src = newSrc;
            audio.load();
        }
        pauseAudio(audio);
    });
}

function pauseAudio(audioElement) {
    return new Promise((resolve) => {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset the audio to the start
        audioElement.onpause = resolve;
        if (audioElement.paused) {
            resolve();
        }
    });
}