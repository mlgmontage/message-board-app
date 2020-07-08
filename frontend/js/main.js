// Variables
const API_URL = "http://localhost:1337/messages";
let offset = 0;
let limit = 5;

// DOM element
const formElm = document.querySelector("#messageForm");
const sendButton = document.querySelector("#sendButton");
const boardElm = document.querySelector("#board");
const loadMoreButton = document.querySelector("#loadMore");

// Display message
displayMessages();

// Event handlers

loadMoreButton.addEventListener("click", (event) => {
  offset = offset + limit;
  displayMessages(false);
});

formElm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElm);
  const username = formData.get("username");
  const message = formData.get("message");

  // validate data
  if (!username.trim()) return;
  if (!message.trim()) return;

  // inserting
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ username, message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const inserted = await response.json();
  displayMessages();

  formElm.reset();
});

// Utils
async function displayMessages(reset = true) {
  fetch(`${API_URL}?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((messages) => {
      if (reset) {
        boardElm.innerHTML = "";
      }

      console.log(messages.pagination);

      messages.data.map((message) => {
        boardElm.appendChild(
          messageElm(message.username, message.message, message.createdAt)
        );
      });
    });
}

function messageElm(username, message, createdDate) {
  const entry = document.createElement("div");
  entry.classList.add("entry");

  const usernameElm = document.createElement("h3");
  usernameElm.textContent = username;

  const messageElm = document.createElement("p");
  messageElm.textContent = message;

  const created = document.createElement("small");
  created.textContent = createdDate;

  entry.appendChild(usernameElm);
  entry.appendChild(messageElm);
  entry.appendChild(created);

  return entry;
}
