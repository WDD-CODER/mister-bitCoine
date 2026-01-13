import { Component, DestroyRef, inject, OnChanges, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FilterBy } from '../../models/filter-by.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'contact-filter',
  standalone: false,
  templateUrl: './contact-filter.html',
  styleUrl: './contact-filter.scss',
})
export class ContactFilter implements OnInit {

  contactService = inject(ContactService)

  filter!: FilterBy
  private filterSubject = new Subject()


  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: filterBy => {
          return this.filter = filterBy
        },
        error: err => console.log('Error', err)
      })

    this.filterSubject
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(() => {
      console.log('fatchin contacts')
      
      this.contactService.setFilterBy(this.filter)
    })
  }


  onChangeInput({ target }: Event) {
    const netFilter = target as HTMLInputElement
    this.filter = { term: netFilter.value }
  }


  onSetFilterBy(filter: FilterBy) {
    this.filterSubject.next(filter)
  }

}
