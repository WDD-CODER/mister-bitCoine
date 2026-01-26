import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';
import { UserMsgService } from '../services/user-msg.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const userMsgService = inject(UserMsgService)

  const user =  inject(UserService).user_()
      console.log("🚀 ~ authGuard ~ user:", user)
      if (!user) {
        userMsgService.onSetErrorMsg('Must Signin first!')
        return router.createUrlTree(['/signup']);
        // return router.navigateByUrl(('/signup'));
      }
      return true
};
//   return inject(UserService).user$.pipe(
//     map(user => {
//       if (!user) {
//         userMsgService.onSetErrorMsg('Must Signin first!')
//         return router.createUrlTree(['/signup']);
//       }
//       return true
//     })
//   );
// };
