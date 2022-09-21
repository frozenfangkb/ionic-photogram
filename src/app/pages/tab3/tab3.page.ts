import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: User = {} as User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logout() {}
}
