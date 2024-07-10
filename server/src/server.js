import { app } from "./app.js";
import { connectBD } from "./config/db.js";

const PORT = process.env.PORT;
connectBD();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
