import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, Page, Service } from '../../models/site.model';

@Component({ selector: 'app-home', standalone: true, imports: [CommonModule], templateUrl: './home.component.html' })
export class HomeComponent {
  @Input({ required: true }) services!: Service[];
  @Output() navigate = new EventEmitter<Page>();
  @Output() openDialog = new EventEmitter<Exclude<Dialog, null>>();
  @Output() selectService = new EventEmitter<Service>();
  imageFailed = false;
}
