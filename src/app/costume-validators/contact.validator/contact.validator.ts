import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable, switchMap, take, timer } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
// contactService = inject(ContactService)

export function OnlyEnglishLetters(control: AbstractControl) {
    const isEnglishLetters = (/^[a-zA-Z ]*$/i).test(control.value)
    return !isEnglishLetters ? { OnlyEnglishLetters: 'Only english letters are allowed' } : null
}

export function mustContainHash(control: AbstractControl) {
    if (!control.value) return null
    const hasAtSymbol = (/@/).test(control.value);
    return hasAtSymbol ? null : { mustContainHash: 'Email must contain @ ' }
}

export function nameTaken(contactService: ContactService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return timer(0).pipe(map(() => null));

    return timer(1000).pipe(
      // Switch to the contacts observable from your service
      switchMap(() => contactService.contacts$.pipe(
        take(1),
        map(contacts => {
          const isTaken = contacts.some(c => 
            c.name.toLowerCase() === control.value.toLowerCase()
          );
          return isTaken ? { nameTaken: 'Name is already in use' } : null;
        })
      ))
    );
  };
}