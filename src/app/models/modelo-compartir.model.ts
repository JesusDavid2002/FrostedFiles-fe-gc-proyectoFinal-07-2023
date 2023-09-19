import { Files } from "./files.model";

export class ModeloCompartir{
    destinatario: string = '';
    asunto: string = '';
    mensaje: string = '';
    archivo!: File ;

    setArchivoFromSelectedFile(selectedFile: Files): void {      
      // base64 a bytes
      let byteCharacters = atob(selectedFile.contenido);
      let byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      // bytes a bytes[]
      let byteArray = new Uint8Array(byteNumbers);

      // bytes[] a blob
      const blob = new Blob([byteArray], {type: selectedFile.extension});

        const file: File = new File([blob], selectedFile.nombre, {
          type: `${selectedFile.extension}` // Establecer el tipo MIME adecuado
        });
        console.log(blob);
        
        this.archivo = file;
    }
    
}