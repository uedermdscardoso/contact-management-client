import { Observable } from "rxjs";
import { Contact } from "../domain/models/user/contact.model";
import { ContactRepositoryPort } from "../../ports/outbound/contact-repository.port";

export class GetContactUseCase {
  constructor(private userRepository: ContactRepositoryPort) {}

  execute(id: string): Observable<Contact> {
    return this.userRepository.getUser(id);
  }
}