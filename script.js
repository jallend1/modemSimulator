let controller = new AbortController();
const insertedText = document.querySelector("#insertedText");
const speedSelector = document.querySelector("#speedSelector");
let baudRate = 300;

speedSelector.addEventListener("change", (e) => {
  baudRate = e.target.value;
  controller.abort();
  controller = new AbortController();
  displayText();
  console.log(baudRate, convertModemSpeedtoDelay(baudRate));
});

const convertModemSpeedtoDelay = (speed) => {
  return 8 / speed;
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
  for (let i = 0; i < sampleText.length; i++) {
    await displayTextSlowly(
      sampleText.slice(0, i + 1),
      convertModemSpeedtoDelay(baudRate)
    );
  }
};

displayText();
