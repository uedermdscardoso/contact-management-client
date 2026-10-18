import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ContactRepositoryPort } from "../../../ports/outbound/contact-repository.port";
import { Contact } from "../../../core/domain/models/user/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactApiRepository implements ContactRepositoryPort {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8082/api';

  getUser(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  save(contact: Contact, file: File): Observable<void> {
	
	const url: string = `${this.apiUrl}/contact/save`;

	const contactBlob = new Blob([JSON.stringify(contact)], {
		type: 'application/json'
	});

	const formData = new FormData();
    formData.append('contact', contactBlob);
	formData.append('file', file);
	
    return this.http.post<void>(url, formData);
  }
}