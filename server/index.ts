import express , { type Express, type Request, type Response }from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import { loadConfig } from './app/config/config';
import { initDB } from './app/services/initDB';
import { initPassport } from "./app/services/passport-jwt";
import usersRoutes from "./app/routes/users";
import { IUser } from './app/schema/User';

loadConfig();
const app = express();
const router = express.Router();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}
// Use CORS middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;

const initApp = async (): Promise<void> => {
    //connecting with DB
    await initDB();
    // passport init
    initPassport();
    // set base path to /api
    app.use("/api", router);
    
    // routes
    router.use("/users", usersRoutes);  

    app.get("/", (req: Request, res: Response) => {
        res.send({ status: "Sachin Jiii" });
      });
    


    http.createServer(app).listen(PORT,() => console.log(`Server running on port http://localhost:${PORT}`));
}




// app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));


void initApp();