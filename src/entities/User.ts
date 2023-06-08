import { Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn({ name: "ID" })
    id: number;

    @Column({ name: 'USERNAME' })
    // @Index({ unique: true })
    username: string;

    @Column({ name: 'NOMBRE' })
    nombre: string;

    @Column({ name: 'PASSWORD' })
    password: string;

    @CreateDateColumn({ name: "FECHA_REGISTRO" })
    fechaRegistro: Date

    @Column({ name: "FECHA_MODIFICACION" })
    fechaModificacion: Date

    constructor(params: IUser = {} as IUser) {
        this.nombre = params.nombre;
        this.username = params.username;
        this.password = params.password;

    }
}

export interface IUser {
    username: string,
    nombre: string,
    password: string
}