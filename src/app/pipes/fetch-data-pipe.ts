import { HttpClient } from '@angular/common/http';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fetchData',
  pure:false,
  standalone: false
})
export class FetchData implements PipeTransform {

  private http = inject(HttpClient)

  fetchData: any = null
  fetchUrl = ''


  transform(url: string): any {
    if (url !== this.fetchUrl) {
      this.fetchData = null
      this.fetchUrl = url
      this.http.get(url).subscribe(data => {
        console.log("🚀 ~ FetchData ~ transform ~ data:", data)
        this.fetchData = data
      })
    }
    return this.fetchData
  }

}
