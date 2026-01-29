import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  imports:[CommonModule]
})
export class Loader {

  loaderService = inject(LoaderService)
  isLoading_ = this.loaderService.isLoading_

}
