import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatorUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);

    const ageNumber = parseInt(value.age.toString(), 10);

    if (isNaN(ageNumber)) {
      //si en el objeto, esa prop que pasaron no es un numero
      throw new HttpException(
        'Edad debe ser un numero',
        HttpStatus.BAD_REQUEST,
      ); //no se pudo transformar
    }

    //si todo está bien solo retorna el objeto con todas las props, pero devuelve la edad parseada a INT
    return { ...value, age: ageNumber };
  }
}
