import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'simple-list',
  standalone: false,
  templateUrl: './simple-list.html',
  styleUrl: './simple-list.scss',
})
export class SimpleList implements OnInit {

  @Input('contacts') filteredContacts!:Contact[]

  ngOnInit(): void {
    console.log('contacts', this.filteredContacts)
  }

}
