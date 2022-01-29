import { PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from './productCreate.dto';

export class UpdateProductDTO extends PartialType(CreateProductDTO){}