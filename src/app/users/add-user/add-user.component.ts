import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Adress } from '../../models/adress.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  //userForm : FormGroup;
  userForm: any;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: Router) { }

  //Utilisation de la méthode réactive
  ngOnInit(): void {
     this.initUserForm();
  }

  initUserForm(){
     this.userForm = this.formBuilder.group({
       prenom: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
       nomfamille: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
       email: this.formBuilder.control("", [Validators.required, Validators.email]),
       description: this.formBuilder.control("", Validators.nullValidator),
       dateNais: this.formBuilder.control("", Validators.required),
       aliases: this.formBuilder.array([]),
       adress: this.formBuilder.group({
        street: this.formBuilder.control("", Validators.required),
        city: this.formBuilder.control("", Validators.required),
        state: this.formBuilder.control("", Validators.required),
        codezip: this.formBuilder.control(0, Validators.required),
       })

     });
  }

  getAliases(): FormArray{
     return this.userForm.get("aliases") as FormArray;
  }

  addAliases(): void{
      this.getAliases().push(this.formBuilder.control("", Validators.required));
  }

  onSubmit(): void{

    const dataUser = this.userForm.value;
    console.log(dataUser);

    const alias = dataUser.aliases ? dataUser.aliases : [];
    const newAdress = new Adress(dataUser.adress.street,
                                 dataUser.adress.city,
                                 dataUser.adress.state,
                                 dataUser.adress.codezip );
    const newUser =  new User(dataUser.prenom,
                         dataUser.nomfamille,
                         dataUser.email,
                         newAdress,
                         dataUser.description,
                         dataUser.dateNais,
                         alias);
      this.usersService.addUser(newUser);
      this.router.navigate(['users']);
  }


}
