const islamicInfo = document.getElementById("islamic-info");
const searchField = document.getElementById("search-field");

// hijria date automatic display

const fetchHijriaAndPray = async () => {
    const hijria = await fetch("https://api.myquran.com/v2/cal/hijr?adj=-1");
    const hijriaData = await hijria.json();

    date = new Date();
    getCurDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const pray = await fetch(`https://api.myquran.com/v2/sholat/jadwal/0412/${getCurDate}`);
    const prayData = await pray.json();

    return ({
        response: prayData.status && hijriaData.status ? true : false,
        hijria: hijriaData.data.date[1],
        pray: prayData.data.jadwal
    });
}

islamicInfo.textContent = 'Fetching hijria and pray data...';
fetchHijriaAndPray()
    .then((data) => {
        if (data.response) islamicInfo.textContent = `📅 ${data.hijria} - ☀ Subuh: ${data.pray.subuh} WIB - 🌤 Dhuha: ${data.pray.dhuha} WIB - ⛅ Dzuhur: ${data.pray.dzuhur} WIB - 🌓 Ashar: ${data.pray.ashar} WIB - 🌒 Maghrib: ${data.pray.maghrib} WIB - 🌚 Isya: ${data.pray.isya} WIB`
        else islamicInfo.textContent = 'Failed to fetch hijria and pray data...';
    })