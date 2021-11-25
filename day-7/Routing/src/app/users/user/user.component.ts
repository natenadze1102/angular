import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userDetails!: any;
  currentUserId!: any;
  constructor(
    private UsersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.currentUserId = value.id;
    });
    this.userDetails = this.UsersService.getUsers().filter((user) => {
      return user.id == this.currentUserId;
    });
    this.userDetails = this.userDetails[0];
  }
}
