import { Inject, Injectable  } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorage } from '../injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | undefined;

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  get userId(): string {
    return this.user!._id!;
  }

  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage']) {
    try {
      const localStorageUser = this.localStorage.getItem('<USER>') || 'ERROR';
      this.user = JSON.parse(localStorageUser);
    } catch {
      this.user = undefined;
    }
  }

  login(id: string, email: string, username: string): void {
    this.user = {
      _id: id,
      email,
      username
    }

    this.localStorage.setItem('<USER>', JSON.stringify(this.user));
  }

  logout(): void {
    this.user = undefined;
    this.localStorage.removeItem('<USER>');
  }
}
