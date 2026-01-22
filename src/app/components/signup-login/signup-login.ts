import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ContactService } from '../../services/contact.service';
import { mustContainHash, nameTaken, OnlyEnglishLetters } from '../../costume-validators/contact.validator/contact.validator';
import { userNameTaken, userNotSignin } from '../../costume-validators/user.validators/user.validator';

const LOGGED_IN_USER = 'signed-users'

@Component({
  selector: 'signup-login',
  standalone: false,
  templateUrl: './signup-login.html',
  styleUrl: './signup-login.scss',
})
export class SignupLogin {

  private fb = inject(FormBuilder)
  private userService = inject(UserService)

  public userSigninForm!: FormGroup
  public userLoginForm!: FormGroup;
  public user: User | null = null

  public singUp: boolean = false

  constructor() {
    this.userSigninForm = this.fb.group({
      name: ['', [Validators.required, OnlyEnglishLetters], userNameTaken(this.userService)],
      email: ['', [Validators.required, mustContainHash]],
      coins: [0],
      moves: [[]]
    })
    this.userLoginForm = this.fb.group({
      name: ['', [Validators.required, OnlyEnglishLetters], userNotSignin(this.userService)],
    })
  }


  onSingUpUser(ev: SubmitEvent) {
    if (this.userSigninForm.invalid) {
      this.userSigninForm.markAllAsTouched()
      return
    }
    return this.userService.setSignedUser(this.userSigninForm.value)
    
  }

  setSingUpLogin($event: MouseEvent) {
    this.singUp = !this.singUp
  }

  onLogin(ev: MouseEvent) {
    if (this.userLoginForm.invalid) {
      this.userLoginForm.markAllAsTouched()
      return
    }
    // console.log('variable')

    this.userService.login(this.userLoginForm.value.name)
  }

}
