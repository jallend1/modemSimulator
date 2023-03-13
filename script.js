let controller = new AbortController();
const insertedText = document.querySelector("#insertedText");
const speedSelector = document.querySelector("#speedSelector");
let bitsPerSec = 300;

const convertModemSpeedtoDelay = (speed) => {
  // 8 bits per character
  const charactersPerSecond = speed / 8;
  // Divide by 10 to get characters per 100ms because less than that makes everything seem the same
  const charactersPer100ms = charactersPerSecond / 10;
  return charactersPer100ms;
};

const displayTextSlowly = (text, delay) => {
  return new Promise((resolve) => {
    const timeOut = setTimeout(() => {
      insertedText.textContent = text;
      resolve();
    }, delay);
    controller.signal.addEventListener("abort", () => {
      clearTimeout(timeOut);
    });
  });
};

const displayText = async () => {
  const charsPer100ms = convertModemSpeedtoDelay(bitsPerSec);
  for (let i = 0; i < sampleText.length; i += charsPer100ms) {
    await displayTextSlowly(sampleText.slice(0, i + charsPer100ms), 100);
  }
};

const handleSpeedChange = (e) => {
  bitsPerSec = e.target.value;
  controller.abort();
  controller = new AbortController();
  displayText();
};

speedSelector.addEventListener("change", handleSpeedChange);

displayText();
