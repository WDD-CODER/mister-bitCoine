import { Component, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-preview',
  standalone: false,
  templateUrl: './contact-preview.html',
  styleUrl: './contact-preview.scss',
})
export class ContactPreview {

  @Input() contact!:Contact 
  
}
