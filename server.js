import server from "./index.js";

const PORT = 2000;

server.listen(PORT, () => {
  console.log("Server is listening at PORT" + " " + PORT);
});
