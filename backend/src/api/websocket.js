const { addListener } = require("../eventBus");

function handleWebsocket(ws, req) {
  const removeListener = addListener((event) => {
    console.log("Sending event data", event);

    try {
      ws.send(JSON.stringify(event));
    } catch (e) {
      console.error(e);
    }
  });

  ws.on("close", () => {
    console.log("Closing the listener");
    removeListener()
  });
}

module.exports = {
  handleWebsocket,
};