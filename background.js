chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { html } = request;
  fetch("https://gpt.best/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      threadHtml: html,
      createdAt: Date.now(),
    }),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((body) => {
      const url = `http://gpt.best/${body.id}`;
      sendResponse({ url });
    });
  return true;
});
