import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  User,
} from '@angular/fire/auth';
import { RealtimeDbService } from './realtime-db.service';
import { USERS_ALLOWED } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: RealtimeDbService
  ) {}

  loginWithGoogle() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  async AuthLogin(provider: AuthProvider) {
    try {
      const result = await this.angularFireAuth.signInWithPopup(provider);
      if (
        USERS_ALLOWED.includes(result.user?.email || '') &&
        result.user?.emailVerified
      ) {
        const uid = result.user.uid;
        const token = await result.user.getIdToken();
        await this.db.setItem('users', {
          [uid]: {
            email: result.user.email,
            name: result.user.displayName,
          },
        });
        localStorage.setItem('uid', uid);
        localStorage.setItem('token', token);
        return result.user.getIdToken();
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async isValidateUser() {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    const user = await this.db.getItem<User>(`users/${uid}`);
    if (!user?.email) return false;

    if (USERS_ALLOWED.includes(user.email) && token !== null) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    this.db.removeItem('users');
    return this.angularFireAuth.signOut();
  }
}
