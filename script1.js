document.getElementById("type").addEventListener("change", function () {
  let recipientField = document.getElementById("recipientField");
  let testimonyOptions = document.getElementById("testimonyOptions");

  if (this.value === "testimony") {
    recipientField.style.display = "none";
    testimonyOptions.style.display = "block";
  } else {
    recipientField.style.display = "block";
    testimonyOptions.style.display = "none";
  }
});

document
  .getElementById("kindnessForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      type: document.getElementById("type").value,
      receiver: document.getElementById("receiver").value || "-",
      message: document.getElementById("content").value,
      anonymous: document.getElementById("anonymous").value,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyv-aZuaFzWjX2kgXjHJsCNMgURWCD1L9L1CzL5KC-Bcvakl8vfDxZIXMbpgQqVc1_y/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.status === "Success") {
        alert("Submitted successfully!");
        document.getElementById("kindnessForm").reset();
      }
      loadTestimonies();
    } catch (error) {
      alert("Submission failed: " + error.message);
    }
  });

async function loadTestimonies() {
  let sheetId = "1QWA4d6E6RZAyb-c8l8JcdQr9_ZzT-dsD3Nq-HnBKu4M";
  let sheetName = "kindnessTestimonies!A2:F1000";
  let apiKey = "%20AIzaSyCzzbOM0OihwfIhDkViLF_VOJv7E2J9FkI";
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?alt=json&key=${apiKey}`;

  let response = await fetch(url);
  let data = await response.json();

  let messagesList = document.getElementById("messagesList");
  messagesList.innerHTML = "";

  data.values.forEach((row) => {
    let name = row[1];
    let message = row[4];
    let receiver = row[3];
    let displayName = row[5] === "yes" ? "Anonymous" : name;
    let newItem;

    if (row[2] == "message") {
      newItem = document.createElement("li");
      newItem.innerHTML = `From: <strong>${displayName}</strong> to: <strong>${receiver} -> </strong> ${message}`;
      messagesList.appendChild(newItem);
    } else {
      newItem = document.createElement("li");
      newItem.innerHTML = `<strong>${displayName}:</strong> ${message}`;
      messagesList.appendChild(newItem);
    }
  });
}

window.onload = loadTestimonies;
