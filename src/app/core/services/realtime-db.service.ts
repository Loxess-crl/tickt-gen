import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDbService {
  constructor(private db: AngularFireDatabase) {}

  async setItem(path: string, value: any) {
    await this.db
      .object('/')
      .set({ [path]: value })
      .then((res) => {
        console.log(res);
      });
  }

  async getItem<T>(path: string): Promise<T | null> {
    return firstValueFrom<T | null>(this.db.object<T>(path).valueChanges());
  }

  removeItem(path: string) {
    this.db.object(path).remove();
  }
}
