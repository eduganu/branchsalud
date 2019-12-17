export class User {
    userID: number;
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: Date;
    altura: number;
    peso: number;
    profesion: string;
    hobby: string;

    constructor(userID?:number, nombre?:string, apellido?:string, sexo?:string, fechaNacimiento?:Date,
         altura?:number, peso?:number, profesion?:string, hobby?:string){
            this.userID = userID;
            this.nombre = nombre;
            this.apellido = apellido;
            this.sexo = sexo;
            this.fechaNacimiento = fechaNacimiento;
            this.altura = altura;
            this.peso = peso;
            this.profesion = profesion;
            this.hobby = hobby;
    }
} 