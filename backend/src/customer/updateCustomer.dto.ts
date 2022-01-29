import { RegisterCustomerDTO } from "./registerCustomer.dto";
import { PartialType } from '@nestjs/mapped-types';
export class UpdateCustomerDTO extends PartialType(RegisterCustomerDTO){}
