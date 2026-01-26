import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CustomRoute } from '../../models/custom-routes.model';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContactList } from '../../components/contact-list/contact-list';

@Component({
  selector: 'contact-page',
  standalone: true,
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  imports:[RouterOutlet, ContactList]
})
export class ContactPage {
}
