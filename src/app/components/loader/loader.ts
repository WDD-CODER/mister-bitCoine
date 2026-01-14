import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader-service';

@Component({
  selector: 'loader',
  standalone: false,
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {

  loaderService = inject(LoaderService)
  isLoading$: Observable<boolean> = this.loaderService.isLoading$

}
