import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';
import { UserMsgService } from '../services/user-msg.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userMsgService = inject(UserMsgService)

  const user = inject(UserService).user_()
  if (user) {
    userMsgService.onSetErrorMsg('You are signed in must logout to reach signup')
    return router.createUrlTree(['/'])
  }
  else return true
};

// .pipe(
//   map(user => {
//     if (user) {
//       userMsgService.onSetErrorMsg('You are signed in must logout to reach signup')
//       return router.createUrlTree(['/']);
//     }
//     return true
//   })
// );

// export const noAuthGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router)
//   const userMsgService = inject(UserMsgService)

//   return inject(UserService).user$.pipe(
//     map(user => {
//       if (user) {
//         userMsgService.onSetErrorMsg('You are signed in must logout to reach signup')
//         return router.createUrlTree(['/']);
//       }
//       return true
//     })
//   );
// };
