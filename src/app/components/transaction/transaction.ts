import { Component, DestroyRef, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'transaction',
  standalone: false,
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss',
})
export class Transaction {

  amount!: number

  private userService = inject(UserService)
  public amountToSent = new FormControl('', [Validators.min(1)])

  onSendFunds(ev: SubmitEvent): void {
    if (this.amountToSent.value) { 
      const coinsToSend:number = +this.amountToSent.value
      this.userService.addCoins(coinsToSend)
    }
  }

}
