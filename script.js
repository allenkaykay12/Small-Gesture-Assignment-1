document.addEventListener("DOMContentLoaded", function () {
  const messageForm = document.getElementById("messageForm");
  const messagesList = document.getElementById("messagesList");

  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const sender = document.getElementById("sender").value;
    const receiver = document.getElementById("receiver").value;
    const message = document.getElementById("message").value;

    // Create a new list item
    const messageItem = document.createElement("li");
    messageItem.innerHTML = `<strong>${sender}</strong> → <em>${receiver}</em>: ${message}`;

    // Append message to the list
    messagesList.appendChild(messageItem);

    // Clear form fields
    messageForm.reset();
  });
});
