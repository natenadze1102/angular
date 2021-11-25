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
  ];

  currentUserId!: number;

  getUsers() {
    return this.users;
  }

  showUser(id: string) {
    // return this.users.find((_id) => {
    //   return id === _id;
    // });
  }

  editUser(id: number, email: string, pass: string) {
    this.users[id - 1].email = email;
    this.users[id - 1].password = pass;
  }

  deleteUser(id: number) {
    // this.users.splice(id - 1, 1);
    // let currentUser = this.users.find((x) => x.id === id);
    // console.log(currentUser);
    return (this.users = this.users.filter((user) => {
      return user.id !== id;
    }));
  }

  showCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  constructor() {}
}
