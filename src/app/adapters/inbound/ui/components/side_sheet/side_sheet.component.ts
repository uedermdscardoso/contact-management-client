import { Component } from '@angular/core';
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

}