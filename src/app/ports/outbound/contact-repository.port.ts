import { Observable } from "rxjs";
import { Contact } from "../../core/domain/models/user/contact.model";

export abstract class ContactRepositoryPort {
  abstract getUser(id: string): Observable<Contact>;
  abstract save(user: Contact, file: File): Observable<void>;
}