import express from "express";
import morgan from "morgan";
import cors from "cors";
import userController from "./controllers/user.controller";
import rolUserController from "./controllers/rolUser.controller";
//import UserController from './controllers/usuario.controller';
const app = express();
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    console.error("Invalid Request data");
    res.send("Petición de request invalido");
  } else {
    next();
  }
});

//3.
app.post("/rolUser/create", rolUserController.Crear);
app.get("/rolUser/list", rolUserController.Obtener);
app.put("/rolUser/edit/:id", userController.Editar);
app.delete("/rolUser/delete/:id", userController.Eliminar);

//5.
app.get("/rolUser/usuarios", rolUserController.users);
export default app;
