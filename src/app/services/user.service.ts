import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  user: User = {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
  }


  getUser() {
    return this.user
  }
}
