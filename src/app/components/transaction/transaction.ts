import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'transaction',
  standalone: false,
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss',
})
export class Transaction implements OnInit {

amount!:number
  private router = inject(Router)

  private destroyRef = inject(DestroyRef)
  private fb = inject(FormBuilder)

  transactionForm!: FormGroup

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      amount:[0],
      from:['The man'],
      at:[ Date.now()]
    })
  }

}
