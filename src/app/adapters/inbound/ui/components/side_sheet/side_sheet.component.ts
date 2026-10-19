import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-side-sheet',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './side_sheet.component.html',
  styleUrls: ['./side_sheet.component.css']
})
export class SideSheetComponent {
  
  @Output() parentContactSelected = new EventEmitter<any>();
  @Output() closeAll = new EventEmitter<void>();
  
  isDisabled: boolean = false;
  
  disable() {
	this.isDisabled = !this.isDisabled;
	this.closeAll.emit();
  }

  passContact(contact: any) {
	this.parentContactSelected.emit(contact);
  }

}