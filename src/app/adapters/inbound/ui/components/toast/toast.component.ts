import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NotificationData {
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

	constructor(
		private cdr: ChangeDetectorRef
	) {}

	message: string | undefined = undefined;
	type: 'success' | 'error' | 'info' = 'info';
	private timeoutId: any;

	show(text: string, durationInSeconds: number = 3, alertType: 'success' | 'error' | 'info' = 'info') : void {
		if(this.timeoutId) {
			clearTimeout(this.timeoutId);
		}

		this.message = text;
		this.type = alertType;

		this.timeoutId = setTimeout(() => {
			this.clear();
			this.cdr.detectChanges();
		}, durationInSeconds);
	}

	clear() : void {
		this.message = undefined;
	}
}