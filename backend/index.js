import { server, app } from "./src/config/socketUtils.js";
import "./src/config/passport.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
