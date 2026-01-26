import { Component, DestroyRef, inject, OnChanges, OnInit, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FilterBy } from '../../models/filter-by.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'contact-filter',
  standalone: true,
  templateUrl: './contact-filter.html',
  styleUrl: './contact-filter.scss',
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})
export class ContactFilter implements OnInit {

  contactService = inject(ContactService)

  filterBy_ = signal<FilterBy>(this.contactService.filterBy_() || {term:''});

  filter!: FilterBy
  private filterSubject = toObservable(this.filterBy_)


  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        console.log('fetching contacts')

        this.contactService.setFilterBy(this.filter)
      })
  }


  onChangeInput({ target }: Event) {
    const netFilter = target as HTMLInputElement
    this.filter = { term: netFilter.value }
  }


  onSetFilterBy(term: string) {
   this.filterBy_.set({ term });
  }

}
