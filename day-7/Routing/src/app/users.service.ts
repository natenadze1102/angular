import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'natenadze1102@gmail.com',
      password: '1234567',
    },
    {
      id: 2,
      email: 'katerina@gmail.com',
      password: '13579',
    },
    {
      id: 3,
      email: 'loranat57@mail.ru',
      password: '12345',
    },
    {
      id: 4,
      email: 'giorgi1993@gmail.com',
      password: '123',
    },
    {
      id: 5,
      email: 'giorgi93@gmail.com',
      password: '123',
    },
    {
      id: 6,
      email: 'giorgi@gmail.com',
      password: '123',
    },
  ];

  currentUserId!: number;

  getUsers() {
    return this.users;
  }

  editUser(id: number, email: string, pass: string) {
    const userIndex = this.users.findIndex((user) => user.id == id);
    this.users[userIndex].email = email;
    this.users[userIndex].password = pass;
  }

  deleteUser(id: number) {
    return (this.users = this.users.filter((user) => {
      return user.id !== id;
    }));
  }

  showCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  constructor() {}
}
