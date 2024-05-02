import { Component } from '@angular/core';
import { RealtimeDbService } from '../../core/services/realtime-db.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import * as QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    QRCodeModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  totalTickets = -1;
  showForm = false;
  qrDataText = '';
  qrCodeDataUrl = '';
  urlFlyer = '../../../assets/img/flyer.jpg';
  isDownloading = false;
  qrText = '';
  totalTicketsUsados = 0;

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
    this.db.getItem<number>('totalTickets').then((res) => {
      this.totalTickets = res ?? 0;
    });
    this.db
      .getItem<{ [key: number]: { code: string; isUsed: boolean } }>('tickets')
      .then((res) => {
        if (res) {
          this.totalTicketsUsados = Object.values(res).filter(
            (ticket) => ticket.isUsed
          ).length;
        }
      });
  }

  generarQR() {
    this.qrText = `${this.totalTickets + 1}-${
      this.qrDataText
    }-${new Date().getTime()}`;
    QRCode.toDataURL(this.qrText, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
        return;
      }
      this.qrCodeDataUrl = url;

      // Superponer el código QR en la imagen del flyer
      const flyerImg = document.createElement('img');
      flyerImg.src = this.urlFlyer;
      flyerImg.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = flyerImg.width;
        canvas.height = flyerImg.height;
        ctx!.drawImage(flyerImg, 0, 0);
        const qrImg = new Image();
        qrImg.src = this.qrCodeDataUrl;
        qrImg.onload = () => {
          const qrSize = Math.min(flyerImg.width, flyerImg.height) * 0.4;
          ctx!.drawImage(
            qrImg,
            10,
            canvas.height - qrSize - 10,
            qrSize,
            qrSize
          );

          const resultadoImg = document.createElement('img');
          resultadoImg.src = canvas.toDataURL('image/jpeg');
          document.getElementById('resultado')!.appendChild(resultadoImg);
        };
      };
    });
  }

  descargarFlyer(): void {
    this.totalTickets = this.totalTickets === -1 ? 0 : this.totalTickets;
    this.totalTickets += 1;
    this.isDownloading = true;
    html2canvas(document.getElementById('resultado')!)
      .then((canvas) => {
        const name = `Ticket#${this.totalTickets}-AEA-RFO-QR.jpg`;
        const link = document.createElement('a');
        link.download = name;
        link.href = canvas
          .toDataURL('image/jpeg')
          .replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        link.click();
      })
      .finally(() => {
        this.db.setItem('totalTickets', this.totalTickets);
        this.db.setItem('tickets', {
          [this.totalTickets]: {
            code: this.qrText,
            isUsed: false,
          },
        });
        this.isDownloading = false;
      });
  }

  logout() {
    this.authService.logout().finally(() => {
      window.location.reload();
    });
  }
}
