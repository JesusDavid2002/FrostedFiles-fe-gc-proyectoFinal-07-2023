import { Files } from "./files.model";

export class ModeloCompartir{
    destinatario: string = '';
    asunto: string = '';
    mensaje: string = '';
    archivo!: File;
}