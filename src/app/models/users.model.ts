import { Roles } from "./roles.model";

export class Users {
    id?: number;
    nombre: string = '';
    password: string = '';
    username: string = '';
    fechaCreacion: string = '';
    descripcion: string = '';
    roles!: Roles;
}