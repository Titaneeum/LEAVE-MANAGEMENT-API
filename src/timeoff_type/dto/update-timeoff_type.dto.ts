import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeoffTypeDto } from './create-timeoff_type.dto';

export class UpdateTimeoffTypeDto extends PartialType(CreateTimeoffTypeDto) {}
