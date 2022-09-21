import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  @ViewChild('mainSlider') mainSlider: IonSlides;

  loginUser = {
    email: '',
    password: '',
  };

  registerUser: User = {
    email: 'testestest@test.com',
    password: '1234',
    name: 'Test',
    avatar: 'av-1.png',
  };

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UiService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.mainSlider.lockSwipes(true);
  }

  async login(fLogin: NgForm): Promise<void> {
    if (fLogin.invalid) {
      return;
    }
    if (
      await this.userService.login(
        this.loginUser.email,
        this.loginUser.password
      )
    ) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.infoAlert('Wrong user or password');
    }
  }

  async register(fRegister: NgForm): Promise<void> {
    if (fRegister.invalid) {
      return;
    }

    if (await this.userService.register(this.registerUser)) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.infoAlert('That email already exists');
    }
  }

  changeScreen(index: number): void {
    this.mainSlider.lockSwipes(false);
    this.mainSlider.slideTo(index);
    this.mainSlider.lockSwipes(true);
  }
}
