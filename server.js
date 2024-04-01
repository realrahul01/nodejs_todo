import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.port, () => {
  console.log(
    `server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
