import { Adress } from "./adress.model";

export class User{

  constructor(
    public prenom: string,
    public nomfamille: string,
    public email: string,
    public adresse: Adress,
    public description: string,
    public dateNais: string,
    public aliases?: string[], //? pour signifier que ce champs sera optionnel
  ) { }
}
