import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todo = new Todo();
  constructor(private todoService: TodoService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit():void {
    this.todoService.addTodo(this.todo);
    this.todoService.emitTodo();
    this.router.navigate(["todo"]);
  }

}
