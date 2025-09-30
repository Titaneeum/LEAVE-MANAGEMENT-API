import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLevelDto } from './create-user_level.dto';

export class UpdateUserLevelDto extends PartialType(CreateUserLevelDto) {}
