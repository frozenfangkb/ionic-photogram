import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { TokenResponse } from '../../models/ApiResponse';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  storage: Storage = null;
  token: string = null;

  constructor(private http: HttpClient, private storageMod: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    this.storage = await this.storageMod.create();
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

  private clearState(): void {
    this.token = null;
    this.storage.clear();
  }
}
