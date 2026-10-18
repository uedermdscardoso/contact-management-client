import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideSheetComponent } from '../side_sheet/side_sheet.component';

interface Users {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  twitter: string;
  skype: string;
  attachment: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SideSheetComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  isDisabledSideSheet: boolean = true;	
  usuarios: Users[] = [
    { id: 1, name: 'Ana', surname: 'Silva', email: 'ana.silva@email.com', phone: '+55 91111-2222', twitter: 'anasilva', skype: 'anasilva', attachment: 'file'},
    { id: 2, name: 'Carlos', surname: 'Souza', email: 'carlos.souza@email.com', phone: '+55 91111-2222', twitter: 'carlossouza', skype: 'carlossouza', attachment: 'file' },
    { id: 3, name: 'Mariana', surname: 'Costa', email: 'mariana.costa@email.com', phone: '+55 91111-2222', twitter: 'marianacosta', skype: 'marianacosta', attachment: 'file' },
    { id: 4, name: 'Lucas', surname: 'Oliveira', email: 'lucas.oliveira@email.com', phone: '+55 91111-2222', twitter: 'lucasoliveira', skype: 'lucasoliveira', attachment: 'file' }
  ];

  addContact() {
	this.isDisabledSideSheet = !this.isDisabledSideSheet;
  }
}