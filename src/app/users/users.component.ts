import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  listUsers : User[] = [];
  usersSubscription : any;


  constructor(private userServices: UsersService) {}

  ngOnInit(): void {
    //initialiser le tableau des users
    this.usersSubscription = this.userServices.listUsersSub.subscribe(
      (usersRecup: User[]) =>{
             this.listUsers = usersRecup;
      }
    );
    this.userServices.emitUsers();
  }

  ngOnDestroy(): void{
    this.usersSubscription.unsubscribe();
  }

}
