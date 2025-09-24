import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestDraftService } from './request_draft.service';
import { CreateRequestDraftDto } from './dto/create-request_draft.dto';
import { UpdateRequestDraftDto } from './dto/update-request_draft.dto';

@Controller('request-draft')
export class RequestDraftController {
  constructor(private readonly requestDraftService: RequestDraftService) {}

  @Post()
  create(@Body() createRequestDraftDto: CreateRequestDraftDto) {
    return this.requestDraftService.create(createRequestDraftDto);
  }

  @Get(':all')
  findAll() {
    return this.requestDraftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestDraftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDraftDto: UpdateRequestDraftDto) {
    return this.requestDraftService.update(+id, updateRequestDraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestDraftService.remove(+id);
  }
}
