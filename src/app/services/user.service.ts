import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ApiResponse, TokenResponse } from '../../models/ApiResponse';
import { User } from 'src/models/User';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  storage: Storage = null;
  token: string = null;
  private user: User = {} as User;

  constructor(
    private http: HttpClient,
    private storageMod: Storage,
    private navCtrl: NavController
  ) {
    this.init();
  }

  async init(): Promise<void> {
    this.storage = await this.storageMod.create();
  }

  getUser(): User {
    // eslint-disable-next-line no-underscore-dangle
    if (!this.user._id) {
      this.verifyToken();
    }
    return { ...this.user };
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      const data = { email, password };

      this.http
        .post<TokenResponse>(`${environment.apiUrl}/user/login`, data)
        .subscribe(async (res) => {
          if (!res.ok || res.error) {
            console.error(res.error);
            this.clearState();
            resolve(false);
          } else {
            await this.saveToken(res.token);
            resolve(true);
          }
        });
    });
  }

  register(user: User): Promise<boolean> {
    return new Promise((resolve) => {
      this.http
        .post<TokenResponse>(`${environment.apiUrl}/user/create`, user)
        .subscribe(async (res) => {
          if (!res.ok || res.error) {
            console.error(res.error);
            this.clearState();
            resolve(false);
          } else {
            await this.saveToken(res.token);
            resolve(true);
          }
        });
    });
  }

  async saveToken(newToken: string): Promise<void> {
    this.token = newToken;
    await this.storage.set('token', newToken);
  }

  async loadToken(): Promise<void> {
    if (!this.storage) {
      this.storage = await this.storageMod.create();
    }
    this.token = (await this.storage.get('token')) || null;
  }

  async verifyToken(): Promise<boolean> {
    await this.loadToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        authorization: `Bearer ${this.token}`,
      });

      this.http
        .get<ApiResponse>(`${environment.apiUrl}/user`, { headers })
        .subscribe((res) => {
          if (res.ok) {
            this.user = res.user;
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  updateUser(user: User): Promise<boolean> {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        authorization: `Bearer ${this.token}`,
      });

      this.http
        .put<TokenResponse>(`${environment.apiUrl}/user/update`, user, {
          headers,
        })
        .subscribe(async (res) => {
          if (!res.ok) {
            console.error(res.error);
            resolve(false);
          } else {
            await this.saveToken(res.token);
            resolve(true);
          }
        });
    });
  }

  private clearState(): void {
    this.token = null;
    this.storage.clear();
  }
}
