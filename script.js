// Todo: Display the amount of time it will take it fully load at the given rate
// Todo: Add a cancel button
// Todo: Add a style sheet
// TOdo: On refresh, the previous option from the drop-down is selected but the original speed is still used
// Todo: Add a slider to change the speed?
// TOdo: Implement error handling for the end of the file

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
