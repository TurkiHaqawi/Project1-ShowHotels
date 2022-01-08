//JavaScript for responsive navigation menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

//Javacript for video slider navigation
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");

let sliderNav = function(manual){
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
}

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});



let reservCount = 1
let searchBtn = document.getElementById("searchBTN")
searchBtn.addEventListener("click", (event) => {
  event.preventDefault()

  let cityName = document.getElementById("city").value
  const urlCityId = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${cityName}&search_type=CITY`

  // Fetch CityId with CityName 
  async function getCityId() {
    try {
        const res = await fetch(urlCityId, {
          "headers": {
            "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
		        "x-rapidapi-key": "547bf35bffmsh5a237c4f89a5a72p18d1d5jsn788f5e2d6f5c"
          }
        })
        const data = await res.json()
        let locationId = data[0].cityID
        console.log(locationId);
        gitHotels(locationId)

    } catch (err) {
        console.log(err);
    }
  }

  // Exicute The Main Function to get CityId
  getCityId()


  // Fetch Hotels by CityId
  async function gitHotels(locId) {
    let checkIn = document.getElementById("checkIn").value
    let checkOut = document.getElementById("checkOut").value
    const urlHotels = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?sort_order=HDR&location_id=${locId}&date_checkin=${checkIn}&date_checkout=${checkOut}&star_rating_ids=3.0%2C3.5%2C4.0%2C4.5%2C5.0&amenities_ids=FINTRNT%2CFBRKFST&rooms_number=1`;
    // roomsNumber = document.getElementById("roomsNumber").value

    try {
      const res = await fetch(urlHotels, {
        "headers": {
          "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
		      "x-rapidapi-key": "547bf35bffmsh5a237c4f89a5a72p18d1d5jsn788f5e2d6f5c"
        }
      })
      const data = await res.json()
      let cityName = data.cityInfo.cityName 
      let countryName = data.cityInfo.countryName
      localStorage.setItem("cityName", cityName)
      localStorage.setItem("countryName", countryName)
      localStorage.setItem("allHotels", JSON.stringify(data.hotels))
      // console.log(data.hotels);
      console.log(data);
      showHotels()
    } catch (err) {
        console.log(err);
    }
  }
})




// Show
function showHotels(data) {
  let titleForCityInfo = document.getElementById("cityInfo")
  let gitCityNameFromStorage = localStorage.getItem("cityName")
  let gitCountryNameFromStorage = localStorage.getItem("countryName")
  if (gitCityNameFromStorage && gitCountryNameFromStorage) {
    titleForCityInfo.textContent = `Hotels in ${gitCityNameFromStorage} - ${gitCountryNameFromStorage}`
  } else {
    titleForCityInfo.textContent = ''
  }

  let hotalsContainer = document.querySelector(".hotelsInf")
  let allHotelsInStorage = JSON.parse(localStorage.getItem("allHotels"))

  if(allHotelsInStorage) {
    for(let i = 0; i < allHotelsInStorage.length; i++) {
      let hotelId = allHotelsInStorage[i].hotelId
      hotalsContainer.innerHTML += `
      <div class="hotelInfo mb-3">
        <div id="hotelDetails">
            <img src="${allHotelsInStorage[i].thumbnailUrl}" class="hotelImg">
            <div>
                <h4 class="hotelTitle">${allHotelsInStorage[i].name}</h4>
                <p>${allHotelsInStorage[i].brand}</p>
                <p>Star Rate: ${allHotelsInStorage[i].starRating} stars</p>
                <span>Total Review Count: ${allHotelsInStorage[i].totalReviewCount}</span>
            </div>
        </div>
        <div class="rightInfo">
            <button onclick="loadMoreInfoFunc(${hotelId})">More Info</button>
            <button onclick="reserveFunc(this)">Reserve</button>
        </div>
      </div>
      <hr>
      `
    }
  } else {
    console.log("Nothing in the storega");
  }
}

// These line will be execute from the firts when the user open this website and on load page
showHotels()
document.body.onload = () => {
  showHotels()
}




//
function loadMoreInfoFunc(id) {
  localStorage.setItem("hotelId", id)
  window.location.replace("hotelDetails.html")
}


// 
function reserveFunc(ele) {

  let perentHotelTag = ele.parentElement.parentElement
  let results = {
    id: reservCount,
    img: perentHotelTag.querySelector(".hotelImg").src,
    title: perentHotelTag.querySelector(".hotelTitle").textContent
  }
  reservCount++

  saveHotelInStorage(results)
}


// save Product
function saveHotelInStorage(item) {
  let reservHotel = getHotelsFromStorage()
  reservHotel.push(item)
  localStorage.setItem("reservHotel", JSON.stringify(reservHotel))
}
// get Product
function getHotelsFromStorage(item) {
  return localStorage.getItem("reservHotel") ? JSON.parse(localStorage.getItem("reservHotel")) : []
}
