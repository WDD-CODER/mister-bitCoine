import { Component, inject, Input, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {

  @Input() contacts: Contact[] | undefined

  ngOnInit(): void {
  }
}
