import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ContactService } from '../../services/contact.service';
import { mustContainHash, nameTaken, OnlyEnglishLetters } from '../../costume-validators/contact.validator/contact.validator';
import { userNameTaken, userNotSignin } from '../../costume-validators/user.validators/user.validator';
import { Router } from '@angular/router';
const LOGGED_IN_USER = 'signed-users'

@Component({
  selector: 'signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)

  public userSigninForm!: FormGroup
  public userLoginForm!: FormGroup;
  public user: User | null = null

  public Signup: boolean = false

  constructor() {
    this.userSigninForm = this.fb.group({
      name: ['', [Validators.required, OnlyEnglishLetters], userNameTaken(this.userService)],
      email: ['', [Validators.required, mustContainHash]],
      coins: [100],
      moves: [[]]
    })
    this.userLoginForm = this.fb.group({
      name: ['', [Validators.required, OnlyEnglishLetters], userNotSignin(this.userService)],
    })
  }


  onSignupUser(ev: SubmitEvent) {
    if (this.userSigninForm.invalid) {
      this.userSigninForm.markAllAsTouched()
      return
    }

    this.userService.signup(this.userSigninForm.value).subscribe({
      next: () => this.router.navigateByUrl('/wallet'),
      error: err => console.log('err', err)

    })

  }

  setSignupLogin($event: MouseEvent) {
    this.Signup = !this.Signup
    this.userSigninForm.reset({
      name: '',
      email: '',
      coins: 100,
      moves: [],
    })


    this.userLoginForm.reset({
      name: '',
    })

  }

  onLogin(ev: MouseEvent) {
    if (this.userLoginForm.invalid) {
      this.userLoginForm.markAllAsTouched()
      return
    }

    this.userService.login(this.userLoginForm.value.name).subscribe({
      next: () => this.router.navigateByUrl('/wallet'),
      error: err => console.log('Error', err)
    })

  }

}
