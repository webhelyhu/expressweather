console.log('File loaded.')


const fetchWeather = function (location) {
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'An error occured!'
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}


const weatherForm = document.querySelector('#weatherform')
const searchText = document.querySelector('#searchtext')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value

    messageOne.textContent = location
    messageTwo.textContent = 'Loading weather info'
    fetchWeather(location)
})

