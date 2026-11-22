import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from '../../models/site.model';

@Component({ selector: 'app-auth-dialog', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './auth-dialog.component.html' })
export class AuthDialogComponent {
  @Input({ required: true }) dialog!: Exclude<Dialog, null>;
  @Output() dismiss = new EventEmitter<void>();
  @Output() openDialog = new EventEmitter<Exclude<Dialog, null>>();
  @Output() notify = new EventEmitter<string>();
  email = '';
  password = '';
  displayName = '';

  submitForm(): void {
    if (!this.email.trim() || (this.dialog === 'login' && !this.password) || (this.dialog !== 'login' && !this.displayName.trim())) return;
    this.notify.emit('รับข้อมูลในหน้าต้นแบบแล้ว — ยังไม่ได้สร้างบัญชีหรือบันทึกลงฐานข้อมูล');
    this.dismiss.emit();
  }
}
