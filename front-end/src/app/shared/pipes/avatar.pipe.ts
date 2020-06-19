import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  transform(src: any): unknown {
    return !src ? 'default-avatar.png' : src;
  }

}
