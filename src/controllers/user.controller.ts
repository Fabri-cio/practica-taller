import { Request, Response } from "express";
import { IUser, User } from "../entities/User";
import { MysqlDataSource } from "../configs/Db";

const repository = MysqlDataSource.getRepository(User);
class UserController {
  public async Obtener(req: Request, res: Response) {
    let error = "Hubo un error";
    try {
      const lista = await repository.find();
      res.send(lista);
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
      res.send(error);
    }
  }
  public async Crear(req: Request, res: Response) {
    let error = "Hubo un error";
    try {
      const users: IUser = req.body;
      const oUser = new User(users);
      await repository.save(oUser);
      error = "Creacion exitosa";
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
    }
    res.send(error);
  }
  public async Editar(req: Request, res: Response) {
    let error = "Hubo un error";

    const users: IUser = req.body;
    try {
      await repository.update(Number.parseInt(req.params.id), users);
      error = "Canbio exitoso";
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
    }
    res.send(error);
  }
  public async Eliminar(req: Request, res: Response) {
    let error = "Hubo un error";
    const { nombre, username, password } = req.body;
    await repository.delete(Number.parseInt(req.params.id));
    try {
      let options = {
        nombre: nombre,
        username: username,
        password: password,
      };
      await repository.update(1, options);
      error = "Eliminacion correcta";
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
    }
    res.send(error);
  }
}

export default new UserController();
