let loading = false;

function start() {
  injectShareButton();
}

function injectShareButton() {
  const container = document.querySelector("main form > div");
  const shareButton = createButton();
  shareButton.addEventListener("click", save);
  container.appendChild(shareButton);
}

async function save() {
  try {
    const html = document.querySelector(
      "div[class*='react-scroll-to-bottom']"
    ).innerHTML;
    const response = await chrome.runtime.sendMessage({ html });
    window.open(response.url, "_blank");
  } catch (error) {
    console.error(error);
    alert(
      "Error saving. Use direct HTML method from https://gpt.best to save."
    );
  } finally {
    loading = false;
  }
}

function createButton() {
  const shareButton = document.createElement("button");
  shareButton.style.color = "white";
  shareButton.style.backgroundColor = "var(--color-primary)";
  shareButton.style.width = "28px";
  shareButton.style.height = "28px";
  shareButton.style.borderRadius = "4px";
  shareButton.style.display = "grid";
  shareButton.style.placeItems = "center";
  shareButton.style.position = "absolute";
  shareButton.style.right = "-42px";
  shareButton.style.bottom = "10px";
  shareButton.appendChild(createShareIcon());
  return shareButton;
}

function createShareIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 32 32");
  svg.setAttribute("height", "16");
  svg.setAttribute("width", "16");
  svg.setAttribute("fill", "currentColor");
  svg.innerHTML = `<path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"/><polygon points="20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2"/>`;
  return svg;
}

start();
