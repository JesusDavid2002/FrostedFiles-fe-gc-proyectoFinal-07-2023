import { Files } from "./files.model";

export class ModeloCompartir{
    destinatario: string = '';
    asunto: string = '';
    mensaje: string = '';
    archivo!: File ;


    setArchivoFromSelectedFile(selectedFile: Files): void {
        // Crear un nuevo File object utilizando las propiedades de selectedFile
        const file: File = new File([selectedFile.contenido], selectedFile.nombre, {
          type: `${selectedFile.extension}` // Establecer el tipo MIME adecuado
        });
        
        this.archivo = file;
    }
}