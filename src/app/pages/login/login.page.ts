import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  @ViewChild('mainSlider') mainSlider: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.mainSlider.lockSwipes(true);
  }

  login(fLogin: NgForm): void {
    console.log(fLogin.valid);
  }

  register(fRegister: NgForm): void {
    console.log(fRegister.valid);
  }

  selectAvatar(avatar): void {
    this.avatars.forEach((av) => (av.seleccionado = false));
    avatar.seleccionado = true;
  }

  showLogin(): void {
    this.mainSlider.lockSwipes(false);
    this.mainSlider.slideTo(0);
    this.mainSlider.lockSwipes(true);
  }

  showRegister(): void {
    this.mainSlider.lockSwipes(false);
    this.mainSlider.slideTo(1);
    this.mainSlider.lockSwipes(true);
  }
}
