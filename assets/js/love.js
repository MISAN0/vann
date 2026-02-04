const params = new URLSearchParams(window.location.search);
const answer = (params.get("answer") || "yes").toLowerCase();

const answerTitle = document.getElementById("answerTitle");
const answerMessage = document.getElementById("answerMessage");

if (answer === "yes") {
  answerTitle.textContent = "YAYYY, BABYYYYYYY ❤️";
  answerMessage.textContent = "You just made my heart so happy. Come here… my Valentine 💖";
} else {
  answerTitle.textContent = "Hehe 😌";
  answerMessage.textContent = "Nahhhh… you’re already mine. Aku sayang kamu. Forever. ❤️";
}

const storyLines = [
  "Long ago, a Bangladeshi boy messaged a cute Indonesian girl on Facebook.",
  "That girl was you, Annisa.",
  "And somehow… you became my favorite person.",
  "We talked for hours. We laughed. We shared everything.",
  "We had misunderstandings, and we learned how to come back stronger.",
  "We stayed close even when life pulled us in different directions.",
  "We missed each other. We found each other again.",
  "And it felt like destiny saying, “Not yet. This love is real.”",
  "Then after so many years… we finally met.",
  "It was magical — like my heart recognized you instantly.",
  "Your smile, your eyes, your voice… semuanya terasa tepat.",
  "We held each other like the world paused for us.",
  "And I knew… this is the love I want forever.",
  "So here we are, sayang — still choosing each other.",
  "Here’s to our future: more laughs, more hugs, more memories.",
  "I’ll love you on the easy days and the hard days.",
  "Always you. Always us."
];

const storyBox = document.getElementById("story");
let index = 0;

function showNextLine() {
  if (index < storyLines.length) {
    const line = document.createElement("div");
    line.className = "story-line";
    line.innerText = storyLines[index];
    storyBox.appendChild(line);

    setTimeout(() => line.classList.add("visible"), 50);

    index++;
    setTimeout(showNextLine, 1900);
  } else {
    document.getElementById("final-text").innerText =
      "I love you, Annisa ❤️ Yours forever, Nomaan";
  }
}

showNextLine();
