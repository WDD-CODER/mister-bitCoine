import { Component, DestroyRef, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'transaction',
  standalone: true,
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss',
  imports:[FormsModule,ReactiveFormsModule]
})
export class Transaction {

  amount!: number

  private router = inject(Router)
  private userService = inject(UserService)

  public amountToSent = new FormControl('', [Validators.min(1)])


  onSendFunds(ev: SubmitEvent): void {
    if (this.amountToSent.value) {
      const coinsToSend: number = +this.amountToSent.value
      this.userService.addCoins(coinsToSend)
    }
  }

  onBack() {
   return this.router.navigateByUrl('/wallet')
  }

}
