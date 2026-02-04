const params = new URLSearchParams(window.location.search);
const answer = (params.get("answer") || "yes").toLowerCase();

const answerTitle = document.getElementById("answerTitle");
const answerMessage = document.getElementById("answerMessage");

if (answer === "yes") {
  answerTitle.textContent = "YAYYY ❤️";
  answerMessage.textContent = "You just made me the happiest person. Come here, my Valentine 💖";
} else {
  answerTitle.textContent = "Nice try 😌";
  answerMessage.textContent = "Nahhhh… you’re already mine. Forever. ❤️";
}

// Love story lines (edited a bit to sound smoother + more romantic)
const storyLines = [
  "Years ago, a Bangladeshi boy messaged a cute Indonesian girl on Facebook.",
  "That’s how our story quietly started.",
  "We talked, we laughed, and we stayed close—even when life was messy.",
  "We had good days, hard days, and everything in between.",
  "We went separate ways for a while...",
  "But somehow, we found each other again—and it felt right.",
  "We talked and talked.",
  "We laughed, cried, fought, and made up.",
  "We cared deeply, loved deeply, and still chose each other.",
  "And after all those years… we finally met.",
  "It felt magical.",
  "It felt like home.",
  "We smiled. We held each other like time slowed down.",
  "This is us—still us.",
  "Here’s to our forever.",
  "To all the laughs, tears, and memories still waiting for us."
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
    setTimeout(showNextLine, 2000);
  } else {
    document.getElementById("final-text").innerText = "I love you, Annisa ❤️ Yours forever, Nomaan";
  }
}

showNextLine();
