import { environment } from 'src/environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, userId: string): string {
    return `${environment.apiUrl}/post/image/${userId}/${img}`;
  }
}
