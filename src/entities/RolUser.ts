//2.
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  ObjectIdColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("rol_user")
export class RolUser {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column({ name: "ID_USER" })
  // @Index({ unique: true })
  id_user: number;

  @Column({ name: "CODIGO" })
  codigo: string;
  //4
  validarCodigo() {
    if (
      this.codigo !== "ADM" &&
      this.codigo !== "USU" &&
      this.codigo !== "JEF"
    ) {
      throw new Error("El campo 'CODIGO' debe ser 'ADM', 'USU' o 'JEF'.");
    }
  }
  AntesInsert() {
    this.validarCodigo();
  }

  AntesUpdate() {
    this.validarCodigo();
  }

  @CreateDateColumn({ name: "FECHA_REGISTRO" })
  fechaRegistro: Date;

  @Column({ name: "FECHA_MODIFICACION" })
  fechaModificacion: Date;

  constructor(params: IRolUser = {} as IRolUser) {
    this.id_user = params.id_user;
    this.codigo = params.codigo;
  }
}

export interface IRolUser {
  id_user: number;
  codigo: string;
}
