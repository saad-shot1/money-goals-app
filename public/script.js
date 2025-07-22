async function sendQuestion() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");

  responseBox.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    responseBox.innerHTML = "✅ " + data.reply;
  } catch (err) {
    console.error(err);
    responseBox.innerHTML = "❌ Failed to get response.";
  }
}
