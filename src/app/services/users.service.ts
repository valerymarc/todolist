import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  listUsers : User[] = [];
  listUsersSub = new Subject<User[]>();

  constructor() { }

  emitUsers(): void{
     this.listUsersSub.next(this.listUsers);
  }

  addUser(user: User): void{
     this.listUsers.unshift(user);
     this.emitUsers();
  }
}
