import { Observable, throwError } from "rxjs";
import { ContactRepositoryPort } from "../../ports/outbound/contact-repository.port";
import { Contact } from "../domain/models/user/contact.model";

export class SaveContactUseCase {
  constructor(private userRepository: ContactRepositoryPort) {}

  execute(user: Contact, file: File): Observable<void> {

	if(!user.email.includes('@')) {
      return throwError(() => new Error('Email is invalid.'));
    }

	return this.userRepository.save(user, file);
  }
}