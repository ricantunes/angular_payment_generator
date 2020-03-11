import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Square } from '../models/square';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  paymentsList: Payment[] = [];

  constructor() { }

  addPayment(paymentName: string, amountVal: number, codeVal: string, gridVal: Square[]) {
    this.paymentsList.push({ name: paymentName, amount: amountVal, code: codeVal, grid: gridVal });
  }

  getPayments() {
    return this.paymentsList;
  }
}
