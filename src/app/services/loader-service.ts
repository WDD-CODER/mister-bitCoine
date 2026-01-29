import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private _isLoading_ = signal<boolean>(false)
  public isLoading_ = this._isLoading_.asReadonly()

  onSetIsLoading(isLoading: boolean) {
    this._isLoading_.set(isLoading)
  }

}
