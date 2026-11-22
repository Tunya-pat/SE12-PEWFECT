import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FAQS } from '../../models/site.model';

@Component({ selector: 'app-help', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './help.component.html' })
export class HelpComponent {
  @Output() notify = new EventEmitter<string>();
  readonly faqs = FAQS;
  question = '';
  expandedFaq = -1;
  sendQuestion(): void {
    if (!this.question.trim()) return;
    this.question = '';
    this.notify.emit('รับข้อความในหน้าต้นแบบแล้ว — ยังไม่ได้ส่งไปยังเจ้าหน้าที่');
  }
}
