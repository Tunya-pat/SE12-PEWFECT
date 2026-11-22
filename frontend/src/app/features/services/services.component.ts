import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, Service } from '../../models/site.model';

@Component({ selector: 'app-services', standalone: true, imports: [CommonModule], templateUrl: './services.component.html' })
export class ServicesComponent {
  @Input({ required: true }) services!: Service[];
  @Input() selectedService: Service | null = null;
  @Output() openDialog = new EventEmitter<Exclude<Dialog, null>>();
}
