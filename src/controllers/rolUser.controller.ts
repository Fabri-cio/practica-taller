import { Request, Response } from "express";
import { MysqlDataSource } from "../configs/Db";
import { IRolUser, RolUser } from "../entities/RolUser";

const repository = MysqlDataSource.getRepository(RolUser);
class RolUserController {
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
      const rolUsers: IRolUser = req.body;
      const oRolUser = new RolUser(rolUsers);
      await repository.save(oRolUser);
      error = "Creacion exitosa";
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
    }
    res.send(error);
  }
  public async Editar(req: Request, res: Response) {
    let error = "Hubo un error";

    const rolUsers: IRolUser = req.body;
    try {
      await repository.update(Number.parseInt(req.params.id), rolUsers);
      error = "Canbio exitoso";
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
    }
    res.send(error);
  }
  public async Eliminar(req: Request, res: Response) {
    let error = "Hubo un error";
    const { id_user, codigo } = req.body;
    await repository.delete(Number.parseInt(req.params.id));
    try {
      let options = {
        id_user: id_user,
        codigo: codigo,
      };
      await repository.update(1, options);
      error = "Eliminacion correcta";
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
    }
    res.send(error);
  }
  public async users(req: Request, res: Response) {
    let error = "Hubo un error";
    try {
      const users = await repository
        .createQueryBuilder("rol_user")
        .innerJoinAndSelect("rol_user.user", "user")
        .select(["user.nombre", "user.username", "rol_user.codigo"])
        .getRawMany();

      res.send(users);
    } catch (error) {
      console.error(`Error ${new Date().toLocaleString()}`, error);
      res.send(error);
    }
  }
}

export default new RolUserController();
