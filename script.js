const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '605d49d3d8msh7b6cc2416f22e0cp152207jsn923541b64c63',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
let BASE_URL = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='
// const getWeather = (city) => {
    //     cityName.innerHTML = city
    //     fetch(`${BASE_URL}${city}`, options)
//         .then(response => response.json())
//         .then((response) => {
//             //console.log(response)
//         })
//         .catch(err => console.error(err));
// }
const fetchApi=async (city)=>{
    const url=`${BASE_URL}${city}`
    try {
        let response=await fetch(url,options)
        if(!response.ok){
            throw "Something went wrong "+response.status
        }
        let data =await response.json()
        return data
    } catch (error) {
        console.warn("error occur",error)
    }
}
const getWeatherForCity = (response) => {
    if(response==undefined){
        console.warn("Error Occured For City")
        return
    }
    cloud_pct.innerHTML = response.cloud_pct
    temp.innerHTML = response.temp
    feels_like.innerHTML = response.feels_like
    humidity.innerHTML = response.humidity
    min_temp.innerHTML = response.min_temp
    max_temp.innerHTML = response.max_temp
    wind_speed.innerHTML = response.wind_speed
    wind_degrees.innerHTML = response.wind_degrees
    sunrise.innerHTML = response.sunrise
    sunset.innerHTML = response.sunset
}
submit.addEventListener("click", async (e) => {
    e.preventDefault()
    cityName.innerHTML=city.value.charAt(0).toUpperCase()+city.value.slice(1)
    getWeatherForCity(await fetchApi(city.value))
    //preCall()
})

// fetchApi("Delhi").then(data=>{
//     cityName.innerHTML ="Delhi"
//     getWeatherForCity(data)
// })
const getWeather=async ()=>{
    cityName.innerHTML="Delhi"
    let data=await fetchApi("Delhi")
    preCall()
    if(data==undefined){
        console.warn("Error Occured for delhi")
    }else {
        getWeatherForCity(data)
    }
}
const arr=['Busan','Dhanbad','Tokyo','Sydney','London','Mumbai']
const preCall= async()=>{
    for(let i=0;i<arr.length;i++) {
        let cloud=document.getElementById(`c${i+1}`)
        let feels=document.getElementById(`f${i+1}`)
        let humidity=document.getElementById(`h${i+1}`)
        let max_temp=document.getElementById(`ma${i+1}`)
        let min_temp=document.getElementById(`mi${i+1}`)
        let sunrise=document.getElementById(`sr${i+1}`)
        let sunset=document.getElementById(`ss${i+1}`)
        let temp=document.getElementById(`t${i+1}`)
        let wind_degrees=document.getElementById(`wd${i+1}`)
        let wind_speed=document.getElementById(`ws${i+1}`)
        try {
            let response=await fetchApi(arr[i])
            if(response==undefined){
                throw "Error Occured"
            }
            cloud.innerText=response.cloud_pct
            feels.innerText=response.feels_like
            humidity.innerText=response.humidity
            max_temp.innerHTML = response.max_temp
            min_temp.innerHTML = response.min_temp
            sunrise.innerHTML = response.sunrise
            sunset.innerHTML = response.sunset
            temp.innerText=response.temp
            wind_degrees.innerHTML = response.wind_degrees
            wind_speed.innerHTML = response.wind_speed
            
            console.log(response)
        } catch (error) {
            console.warn(error)
        }
    }
}

//start 
getWeather()