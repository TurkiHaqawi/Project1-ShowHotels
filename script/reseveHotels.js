

// // // 
function showReserveHotels() {
    let getAllHotelsFromStorage = JSON.parse(localStorage.getItem("reservHotel"))
    let hotelsReserves = document.querySelector(".hotelsReserves")
    for (let i = 0; i < getAllHotelsFromStorage.length; i++) {
        hotelsReserves.innerHTML += `
        <div class="singleHotel">
            <img src="${getAllHotelsFromStorage[i].img}">
            <h3>${getAllHotelsFromStorage[i].title}</h3>
        </div>
        <hr>
        `
    }
}

showReserveHotels()


