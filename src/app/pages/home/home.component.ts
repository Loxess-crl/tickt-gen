import { Component } from '@angular/core';
import { RealtimeDbService } from '../../core/services/realtime-db.service';
import { FirebaseService } from '../../core/services/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private db: RealtimeDbService,
    private authService: FirebaseService
  ) {}
  ngOnInit() {
    this.authService.isValidateUser().then((res) => {
      if (!res) {
        this.authService.logout().finally(() => {
          window.location.reload();
        });
      }
    });
  }
}
