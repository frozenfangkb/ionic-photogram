import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: User = {} as User;

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  async updateUser(fUserData: NgForm): Promise<void> {
    if (fUserData.invalid) {
      return;
    }

    if (await this.userService.updateUser(this.user)) {
      this.uiService.sendToastMessage('bottom', 'User updated successfully');
    } else {
      this.uiService.sendToastMessage(
        'bottom',
        'There was an error updating the user'
      );
    }
  }

  logout() {
    this.postsService.postsPage = 0;
    this.userService.logout();
  }
}
