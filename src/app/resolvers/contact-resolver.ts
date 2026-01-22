import { ResolveFn } from '@angular/router';
import { Contact } from '../models/contact.model';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader-service';
import { ContactService } from '../services/contact.service';
import { delay, finalize, tap } from 'rxjs';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const contactService = inject(ContactService)
  const loaderService = inject(LoaderService)
  const contactId = route.params['contactId'] || route.parent?.params['contactId']

  return contactService.getContactById(contactId).pipe(
    tap(() => loaderService.onSetIsLoading(true)),
    delay(1000),
    finalize(() => loaderService.onSetIsLoading(false)),
  )
};
