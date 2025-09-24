import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDraftDto } from './create-request_draft.dto';

export class UpdateRequestDraftDto extends PartialType(CreateRequestDraftDto) {}
