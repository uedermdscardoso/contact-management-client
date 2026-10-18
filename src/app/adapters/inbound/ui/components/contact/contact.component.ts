import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaveContactUseCase } from '../../../../../core/use-cases/save-contact.use-case';
import { Contact } from '../../../../../core/domain/models/user/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private saveContactUseCase = inject(SaveContactUseCase);

  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  selectedFileName: string | null = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.maxLength(50)]], 
	  email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', Validators.required, Validators.maxLength(25)],
	  twitter: ['', Validators.required, Validators.maxLength(20)],
	  skype: ['', Validators.required, Validators.maxLength(20)],
	  attachment: [null],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      
      this.contactForm.patchValue({
        attachment: file
      });
    } else {
      this.selectedFileName = null;
      this.contactForm.patchValue({
        attachment: null
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

	var twitterLink: string = `https://www.twitter.com/${this.contactForm.value.twitter}`;
	var skypeContact: string = `skype:${this.contactForm.value.skype}`
	
	const newUser: Contact = {
      id: crypto.randomUUID(),
      name: this.contactForm.value.name!,
	  surname: this.contactForm.value.surname!,
      email: this.contactForm.value.email!,
	  phone: this.contactForm.value.phone,
	  twitterLink: twitterLink,
	  skypeContact: skypeContact,
    };

	var file: File = this.contactForm.value.attachment;

	this.saveContactUseCase.execute(newUser, file).subscribe({
      next: () => {
    	console.log('New user data:', newUser);

        this.successMessage = 'User saved successfully!';
        this.errorMessage = '';
		this.contactForm.reset();
		this.submitted = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error saving the user.';
        this.successMessage = '';
      }
    });
  }
}