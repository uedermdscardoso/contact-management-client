import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideSheetComponent } from '../side_sheet/side_sheet.component';
import { ContactDTO } from '../../../../../core/domain/models/user/contact-dto.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ToastComponent } from '../toast/toast.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SideSheetComponent, ToastComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('toastRef', { static: false }) toastComponent!: ToastComponent;

  private http = inject(HttpClient);

  server: string  = "http://localhost:8082/api";
  isDisabledSideSheet: boolean = true;	
  contacts: ContactDTO[] = [];
  searchContacts: ContactDTO[] = [];
  errorMessage: string = '';
  text_search: string = '';
  isSearch: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.loadContacts();
  }

  submitSearchValue(value: string) {
	if(value == undefined || value == '') {
		this.isSearch = false;
		this.cdr.detectChanges();
	} else {
		this.http.get<ContactDTO[]>(`${this.server}/contact/value/${value}`).subscribe({
			next: (contacts: ContactDTO[]) => {
				this.isSearch = true;
				this.searchContacts = [...contacts];
				this.cdr.detectChanges();
			},
			error: (err) => {
				console.error('Error loading contacts', err);
				this.errorMessage = 'Unable to load contacts.';
			}
		});
	}
  }

  makeClose(): void {
    this.isDisabledSideSheet = true;
  }

  receiveContact(contact: any) {
	if(contact) {
		this.contacts = [...this.contacts, contact];
	}
  }

  loadContacts(): void {
    this.getContacts().subscribe({
      next: (contacts: ContactDTO[]) => {
        this.contacts = [...contacts, ...this.contacts];
		this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading contacts', err);
		this.errorMessage = 'Unable to load contacts.';
      }
    });
  }

  getContacts(): Observable<ContactDTO[]> {
	return this.http.get<ContactDTO[]>(`${this.server}/contact/all/id`);
  } 

  async deleteContact(id: string): Promise<void> {
	await firstValueFrom(this.http.delete(`${this.server}/contact/${id}/delete`));
	this.contacts = this.contacts.filter(contact => contact.id !== id);
	this.cdr.detectChanges();1
  }

  getFile(contact: ContactDTO) : Observable<Blob> {
	return this.http.get(`${this.server}/contact/file?filename=${contact.attachmentPath}`, { responseType: 'blob' });
  }

  downloadAttachment(contact: ContactDTO) {
	this.getFile(contact).subscribe({
		next: (blob) => {
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		
		const filename = contact.attachmentPath.split('/').pop() || 'arquivo';
		link.download = filename;
		
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		
		window.URL.revokeObjectURL(url);
		},
		error: (err) => {
			console.error('Erro ao baixar o arquivo:', err);
		}
	});
  }

  seeFile(contact: ContactDTO) {
	if(contact.attachmentPath != null && contact.attachmentPath != "") {
		this.getFile(contact).subscribe({
			next: (blob) => {
				const fileURL = URL.createObjectURL(blob);
				
				window.open(fileURL, '_blank');
			},
			error: (err) => {
				console.error('Error loading the file:', err);
			}
		});
	} else {
		var notificationMessage : string = 'The attachment was not sent.';
		this.toastComponent?.show(notificationMessage, 1000, 'error');
	}
  }

  addContact() {
	this.isDisabledSideSheet = !this.isDisabledSideSheet;
  }

}