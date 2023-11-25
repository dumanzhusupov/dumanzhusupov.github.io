var configTime = {
  timeHours: 24,
  animationRatePerSecond: 1000,
};

let countToDate;
let intervalID;

window.addEventListener("load", () => {
  const submitConfig = document.querySelector("#submitConfig");
  const txtInfo = document.querySelector("#setConfig");

  resetCountdown();

  submitConfig.addEventListener("click", (event) => {
    event.preventDefault(); 
    resetCountdown(parseInt(txtInfo.value, 10) || configTime.timeHours);
  });
});

function resetCountdown(hoursToAdd = configTime.timeHours) {
  if (intervalID) clearInterval(intervalID); 
  countToDate = new Date().setHours(new Date().getHours() + hoursToAdd);
  updateCountdown(); 

  intervalID = setInterval(() => {
    updateCountdown();
  }, configTime.animationRatePerSecond);
}

function updateCountdown() {
  const currentDate = new Date();
  let timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
  if (timeBetweenDates < 0) {
    clearInterval(intervalID);
    timeBetweenDates = 0; 
  }
  flipAllCards(timeBetweenDates);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", e => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", e => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", e => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}
