/* ================================================================
   MOVIE CHAT — AI movie buddy via /api/chat
   ================================================================ */
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };

  var chatToggle = $("#movieChatToggle");
  var chatBox = $("#movieChatBox");
  var chatClose = $("#movieChatClose");
  var chatMessages = $("#movieChatMessages");
  var chatInput = $("#movieChatInput");
  var chatSend = $("#movieChatSend");

  if (!chatToggle || !chatBox) return;

  var chatHistory = [];

  function addMsg(text, who) {
    var msg = document.createElement("div");
    msg.className = "chat-msg " + (who === "user" ? "chat-user" : "chat-bot");
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addTyping() {
    var msg = document.createElement("div");
    msg.className = "chat-msg chat-bot";
    msg.textContent = "thinking of the perfect movie... 🎬";
    msg.id = "movieChatTyping";
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function removeTyping() {
    var el = document.getElementById("movieChatTyping");
    if (el) el.remove();
  }

  async function send() {
    var text = chatInput.value.trim();
    if (!text) return;
    addMsg(text, "user");
    chatInput.value = "";
    addTyping();
    chatHistory.push({ role: "user", content: text });

    try {
      var resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory.slice(-8),
          context: "movies"
        })
      });
      var data = await resp.json();
      removeTyping();
      if (data.reply) {
        addMsg(data.reply, "bot");
        chatHistory.push({ role: "assistant", content: data.reply });
      } else {
        addMsg("Sorry, I could not think of a movie right now. Try again? 🍿", "bot");
      }
    } catch (err) {
      removeTyping();
      addMsg("Connection issue... try again? 🍿", "bot");
    }
  }

  chatSend.addEventListener("click", send);
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); send(); }
  });

  chatToggle.addEventListener("click", function () {
    chatBox.classList.toggle("open");
    chatToggle.classList.toggle("open");
  });
  chatClose.addEventListener("click", function () {
    chatBox.classList.remove("open");
    chatToggle.classList.remove("open");
  });

  addMsg("Hi! 🎬 I'm your movie buddy. Tell me your mood — cozy, adventurous, romantic, thriller, fun? Or ask for a date night pick! 🍿♡", "bot");
})();
