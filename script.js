// API KEY FOR NASA
// JlAt19Qx9Uma3EB9ipu6iNcegaErc8Jeku7HT5dZ 
const $container = document.getElementById('container') 
const $clock = document.getElementById('clock')
const $dayMonth = document.getElementById('month-day')
const $monthYear = document.getElementById('month-year')
const $dayYear = document.getElementById('day-year')
const $dayWeek = document.getElementById('day-week')
const $moreInfo = document.getElementById('more-info')
const $closeButton = document.querySelector('.closebtn')
const $openButton = document.querySelector('.open-nav')
const $ampm = document.getElementById('ampm')
const $form = document.getElementById('form')
const $toggleDate = document.getElementById('date-toggle')
// let is24Hour = true
let showSeconds = true
let showDate = true

const $hours = document.getElementById('hours')
const $minutes = document.getElementById('minutes')
const $seconds = document.getElementById('seconds')
let decrease = 0


// Display NASA APOD as Background image
fetch('https://api.nasa.gov/planetary/apod?api_key=JlAt19Qx9Uma3EB9ipu6iNcegaErc8Jeku7HT5dZ').then(function (response) {
        return response.json() 
    }).then(function (imageData) {
      
      if(imageData.media_type == "video") {
        let container = document.getElementById('video-container')
        let video =	`<iframe width="100%" height="auto" src="${imageData.url}"></iframe>`
        container.innerHTML += video
      }
      else {
        document.body.style.cssText += `background-image: url(${imageData.url}); height: 100%; background-repeat: no-repeat; background-position: center; background-size: cover;`
      }
})

// Display clock
function newTime() {                                    
  let today = new Date()
  let hours = document.createTextNode(today.getHours() - decrease)
  greetingMessage(today.getHours())
  let minutes = document.createTextNode(today.getMinutes())
  let seconds = document.createTextNode(today.getSeconds())
  hours = currentTime(hours)
  minutes = currentTime(minutes)
  seconds = currentTime(seconds)
  
 $hours.innerHTML=''
 $minutes.innerHTML=''
 $seconds.innerHTML=''
 $hours.appendChild(hours)
 $minutes.appendChild(minutes)
 $seconds.appendChild(seconds)
  let time = setTimeout(newTime, 500)

}
const $greeting = document.getElementById('greeting')
// Greetings message
function greetingMessage(theHours){
  if (theHours >= 12) {
		$greeting.innerHTML = "Good afternoon, it is currently"
  }
  else{
    $greeting.innerHTML = "Good morning, it is currently"
  }
}
// Add zero if there number value is less than 10
function currentTime(i) {
  let oneDigit = parseInt(i.wholeText)
  if (oneDigit < 10) {oneDigit = "0" + oneDigit}
  return document.createTextNode(oneDigit);
}
// Load the time
window.addEventListener('load', function() {
  newTime()      
  startSaved()
})

function startSaved(){
  let getDateValue = window.localStorage.getItem('date')
  let get24HourValue = window.localStorage.getItem('24Hour')

  if (getDateValue && get24HourValue) {
    document.querySelector(getDateValue).checked = true
    document.querySelector(get24HourValue).checked = true
    toggleCurrentDate()
    changeTime()
  }
  else {
  document.querySelector('#date-on').checked = true
  showCurrentDate()
  document.querySelector('#hour-on').checked = true
  changeTime()
  }
}
// Current full date function
function showCurrentDate(){
  const monthOfTheYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  let today = new Date()
  let day = today.getDate()
  let month = today.getMonth()
  let year = today.getFullYear()

  $toggleDate.innerHTML = `<span>${monthOfTheYear[month]} ${day}, ${year}</span>`
}

function toggleCurrentDate(){
  let checkTheDate = document.querySelector("input[name='date']:checked").value
  if (checkTheDate ==='on') {
    showCurrentDate()
    window.localStorage.setItem('date', '#date-on')
  }
  else{
    $toggleDate.innerHTML = ''
    window.localStorage.setItem('date', '#date-off')
  }
}
// Change the time format from 24 to 12, it starts at 24 if there's nothing saved in localstorage
function changeTime(){
  let check24Hour = document.querySelector("input[name='24Hour']:checked").value

  if (check24Hour === 'on') {
    $ampm.innerText = ''
    window.localStorage.setItem('24Hour', '#hour-on')
    decrease = 0
  }
  else{
    let date = new Date()
    let hours = date.getHours()
    if (hours < 12) {
      $ampm.innerText = 'A.M.'
    }
    else{
      $ampm.innerText = 'P.M.'
      decrease = 12
    }
    window.localStorage.setItem('24Hour', '#hour-off')
  }
}

  // More info function
function displayInfo() {
  let date = new Date()
  // Date of the month
  let dayOfMonth = date.getDate()
  $dayMonth.innerHTML += `<span>${dayOfMonth}</span>`

  // Display day of the Week
  const dayOfTheWeek = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday',
    'Thursday', 
    'Friday', 
    'Saturday'
  ]
  
  let day = date.getDay()
  $dayWeek.innerHTML += `<span>${dayOfTheWeek[day]}</span>`

  // Display current month
  const monthOfTheYear = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June',
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ]
  let currentMonth = date.getMonth()
  $monthYear.innerHTML += `<span>${monthOfTheYear[currentMonth]}</span>`

        
  // Display the week of the year
  let start = new Date(date.getFullYear(), 0, 0)
  let diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)
  let oneDay = 1000 * 60 * 60 * 24
  let dayOfYear = Math.floor(diff / oneDay)

  $dayYear.innerHTML += `<span>${dayOfYear}</span>`

}
displayInfo()

$moreInfo.addEventListener('click', function() {
	let infoContainer = document.getElementById('info-container')
	infoContainer.hidden = !infoContainer.hidden
})

function openNav() {document.getElementById('mySidenav').style.width = "250px"}
function closeNav() {document.getElementById('mySidenav').style.width = "0"}

$closeButton.addEventListener('click', closeNav)
$openButton.addEventListener('click', openNav)

//event listener to send the information when the button is clicked
document.querySelector('.save-settings').addEventListener('click', function(){

  changeTime()
  toggleCurrentDate()

})



