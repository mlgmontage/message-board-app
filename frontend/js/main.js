// Variables
const API_URL = 'http://localhost:1337/messages'

// DOM element
const formElm = document.querySelector('#messageForm')
const sendButton = document.querySelector('#sendButton')
const boardElm = document.querySelector('#board')

// Display message
displayMessages()

// Event handlers
sendButton.addEventListener('click', (event) => {
  event.preventDefault()
  const formData = new FormData(formElm)
  const username = formData.get('username')
  const message = formData.get('message')
  console.log(`${username} - ${message}`)
})

// Utils

async function displayMessages() {
  const response = await fetch(API_URL)
  const messages = await response.json()

  messages.data.forEach((message) => {
    console.log(message)
    boardElm.appendChild(
      messageElm(message.username, message.message, message.createdAt),
    )
  })
}

function messageElm(username, message, createdDate) {
  const entry = document.createElement('div')
  entry.classList.add('entry')

  const usernameElm = document.createElement('h3')
  usernameElm.textContent = username

  const messageElm = document.createElement('p')
  messageElm.textContent = message

  const created = document.createElement('small')
  created.textContent = createdDate

  entry.appendChild(usernameElm)
  entry.appendChild(messageElm)
  entry.appendChild(created)

  return entry
}
