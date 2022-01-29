import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceDTO } from './InvoiceCreate.dto';

//Updated Data Transfer Object fir InvoiceLineDTO
export class UpdateInvoiceDTO extends PartialType(CreateInvoiceDTO){}