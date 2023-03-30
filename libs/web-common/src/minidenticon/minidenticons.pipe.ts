import { Pipe, PipeTransform } from '@angular/core';
import { identiconBuilder, IdenticonBuilder } from './minidenticons';

@Pipe({ name: 'identicon', standalone: true, pure: true })
export class IdenticonsPipe implements PipeTransform {
    transform(value: string): IdenticonBuilder {
        return identiconBuilder(value);
    }
}
