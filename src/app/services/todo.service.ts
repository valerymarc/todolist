import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  today : Date = new Date();
  listTodo: Todo[] = [];
  //listTodoSlice: any;
  listTodoSubject = new Subject<any[]>();



   constructor(private httpClient: HttpClient){
     /*setTimeout(() => {
      this.listTodo  = [
        {
          nom:"Projet 1",
          status:true,
          image: "https://vergerpelanne.com/wp-content/uploads/2017/06/pomme-anaglo.jpg",
          isModif: false,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
         nom:"Projet 2",
         status:false,
         image: "https://vergerpelanne.com/wp-content/uploads/2017/06/pomme-anaglo.jpg",
         isModif: false,
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
       },
       {
         nom:"Projet 3",
         status:true,
         image: "https://vergerpelanne.com/wp-content/uploads/2017/06/pomme-anaglo.jpg",
         isModif: false,
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
       },
       {
         nom:"Projet 4",
         status:false,
         image: "https://vergerpelanne.com/wp-content/uploads/2017/06/pomme-anaglo.jpg",
         isModif: false,
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
       },
       {
         nom:"Projet 5",
         status:true,
         image: "https://vergerpelanne.com/wp-content/uploads/2017/06/pomme-anaglo.jpg",
         isModif: true,
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
       },
     ];
     this.emitTodo();
     }, 1000); */

      this.getTodoServer();

   }



emitTodo(): void{
  this.listTodoSubject.next(this.listTodo);
}

onChangeStatus(j: number){
  this.listTodo[j].status = !this.listTodo[j].status;
  this.emitTodo();
  this.saveTodoServer();
}

onChangeModif(j: number){
  this.listTodo[j].isModif = !this.listTodo[j].isModif;
  this.emitTodo();
  this.saveTodoServer();
}

getTodo(index: number){
  if(this.listTodo[index]){
    return this.listTodo[index];
  }
  return false;
}

addTodo(todo: Todo): void{
  this.listTodo.unshift(todo);
  this.emitTodo();
  this.saveTodoServer();
}



saveTodoServer(): void {
  this.httpClient.put("https://todo-list-b475b-default-rtdb.firebaseio.com/todos.json", this.listTodo)
      .subscribe(
        () => {
          console.log("Données enregistrées avec succès");

        },
        (error) =>{
          console.log("Erreur de sauvegarde", error)
        }
      );
}

getTodoServer() {
  this.httpClient.get<Todo[]>("https://todo-list-b475b-default-rtdb.firebaseio.com/todos.json")
      .subscribe(
        (todosRecup: Todo[]) =>{
          this.listTodo = todosRecup;
          this.emitTodo();
        },
        (error) => {
          console.log("Erreur de rcupération des données", error);
        },
        () => {
          console.log("Récupération des données terminée");
        }
      );

}

}
