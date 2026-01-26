import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map, switchMap, take, timer } from "rxjs";
import { UserService } from "../../services/user.service";


export function userNameTaken(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return timer(0).pipe(map(() => null));

    return timer(1000).pipe(
      map(() => {
        const isTaken = userService.users_()?.some(c =>
          c.name.toLowerCase() === control.value.toLowerCase()
        );
        return isTaken ? { userNameTaken: 'Name is already in use' } : null;
      })
    );
  };
}

export function userNotSignin(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return timer(0).pipe(map(() => null));

    return timer(1000).pipe(
      // Switch to the contacts observable from your service
      map(() => {
        const exist = userService.users_()?.some(c =>
          c.name.toLowerCase() === control.value.toLowerCase()
        );
        return !exist ? { userNotSignin: 'No such signup user ' } : null;
      })
    );
  };
}
