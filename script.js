const contentArea = document.querySelector(".contentArea")
const locationImg = document.querySelector(".locationImg")

locationImg.addEventListener ('click',()=>{
    requestAnimationFrame(() =>{
       
        contentArea.classList.add("trans")
            contentArea.classList.remove("hidden")
        locationImg.classList.remove("flex")
        locationImg.classList.add("hidden")
       
       
          
       
    })
})

const inputCity = document.querySelector(".inputCity")


inputCity.addEventListener('keypress',(e)=>{
 if(e.key === 'Enter'){
    e.preventDefault();
    getLocation();
 }
})

let fetchLatitude = null;
let fetchLogitude = null;

const getLocation = () =>{
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${inputCity.value}&format=json&apiKey=d7ef29e5f8554fecb7d58e7bdee4b98e`)
    .then(res => res.json())
    .then((data)=>{
      console.log(data.results[0])
      fetchLatitude = data.results[0].lat;
      fetchLogitude = data.results[0].lon;
      
      updateMapView(fetchLatitude,fetchLogitude);
      listDetails(data)
    })
    .catch(err=> console.log(err))
}

// ========================== View Map When Page Load=============
let map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ===========================Update Map When input new City==========
const updateMapView = (latitude, longitude) => {
    map.setView([latitude, longitude], 13);
  
    let circle = L.circle([latitude, longitude], {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 400,
    }).addTo(map);
   
};

const listDetails =(details) =>{
    const result = details.results[0];
    const newElement = document.createElement("ul")
   
    const displayDetails = document.querySelector(".displayDetails")
   
    for(const key in result)
    {
        if(result.hasOwnProperty(key) &&!["datasource", "timezone", "bbox", "rank","result_type", "plus_code"].includes(key)){
            const listItem = document.createElement("li")
            listItem.innerHTML = `${key}:${result[key]}`;
            newElement.appendChild(listItem)
        }
    }

    while(displayDetails.firstChild){
        displayDetails.removeChild(displayDetails.firstChild);
    }

    displayDetails.appendChild(newElement)
}

