import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Input() initialAvatar: string;
  @Output() avatarSelected = new EventEmitter<string>();

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: false,
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

  ngOnInit() {
    const avatarIndex = this.avatars.findIndex(
      (x) => x.img === this.initialAvatar
    );

    if (avatarIndex !== -1) {
      this.avatars[avatarIndex].seleccionado = true;
    } else {
      this.avatars[0].seleccionado = true;
    }
  }

  selectAvatar(avatar): void {
    this.avatars.forEach((av) => (av.seleccionado = false));
    avatar.seleccionado = true;
    this.avatarSelected.emit(avatar.img);
  }
}
