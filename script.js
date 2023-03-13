let controller = new AbortController();
const insertedText = document.querySelector("#insertedText");
const speedSelector = document.querySelector("#speedSelector");
let baudRate = 300;

// TODO: Gotta shift the framing here! Two variables to track, maybe? One for delay (for low baud rates), and one for higher baud rates where they render multiple characters each ms

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

const handleSpeedChange = (e) => {
  baudRate = e.target.value;
  controller.abort();
  controller = new AbortController();
  displayText();
  console.log(baudRate, convertModemSpeedtoDelay(baudRate));
};

speedSelector.addEventListener("change", handleSpeedChange);

displayText();
