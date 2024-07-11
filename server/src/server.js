import { app } from "./app.js";
import { connectBD } from "./config/db.js";
import { setupSocket } from "./socket.js";

const PORT = process.env.PORT;
connectBD();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setupSocket(server);
