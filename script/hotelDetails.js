
// // // 
async function gitHotelDetails() {
    let hotelId = localStorage.getItem("hotelId")
    const url = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/details?hotel_id=${hotelId}`
    // console.log(hotelId);
    try {
        const res = await fetch(url, {
            "headers": {
                "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
                "x-rapidapi-key": "547bf35bffmsh5a237c4f89a5a72p18d1d5jsn788f5e2d6f5c"
            }
        })
        const data = await res.json()
        showHotelDetails(data)
        showHotelInfo(data)
        // console.log(data);
    } catch (err) {
        console.log(err);
    }
}

gitHotelDetails()


function showHotelDetails(info) {

    let hotelImagesSection = document.querySelector(".imagesSection")
    let imagesArr = info.images
    for(let i = 0; i < imagesArr.length; i++) {
        hotelImagesSection.innerHTML += `
            <img src="${imagesArr[i].imageUrl}" alt="" class="img">
        `
    }
}



function showHotelInfo(info) {
    let hotelName = info.name
    let hotelBrand = info.brand
    let hotelDescription = info.description
    let infoHotelH3 = document.querySelector(".informationHotel h3").textContent = hotelName
    let infoHotelBrand = document.getElementById("brand").textContent = hotelBrand
    let infoHotelDesc = document.getElementById("desc").textContent = hotelDescription
    
    let reviewsContainer = info.guestReviews
    let reviews = document.querySelector(".reviwes")
    for (let i = 0; i < reviewsContainer.length; i++) {
        reviews.innerHTML += `
            <p>Reviewer Name: <span class="reviewerName">${reviewsContainer[i].firstName}</span></p>
            <p class="positive">Positive Comment: <span>${reviewsContainer[i].reviewTextPositiv}</span></p>
            <p class="negative">Negative Comment: <span>${reviewsContainer[i].reviewTextNegative}</span></p>
        `
    }
    
}


