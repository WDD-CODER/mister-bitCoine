import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)

  return userService.user$.pipe(
    map(user=> {
      return !!user || router.createUrlTree(['/wallet']);
    })
  );
};
