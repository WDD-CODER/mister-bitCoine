import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  return inject(UserService).user$.pipe(
    map(user=> {
      if (!user) {
        return router.createUrlTree(['/wallet']);
      }
      return true
    })
  );
};
