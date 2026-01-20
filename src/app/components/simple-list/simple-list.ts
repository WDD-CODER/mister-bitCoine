import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'simple-list',
  standalone: false,
  templateUrl: './simple-list.html',
  styleUrl: './simple-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleList implements OnInit {


  @Input('contacts') filteredContacts!: Contact[]
  @Output() remove = new EventEmitter<string>()

  ngOnInit(): void {
  }

  // nothing() {
  // }

}
