/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TimeOffRequestService } from './time_off_request.service';
import { CreateTimeOffRequestDto } from './dto/create-time_off_request.dto';
import { UpdateTimeOffRequestDto } from './dto/update-time_off_request.dto';
import multer from 'multer';
import type { Response } from 'express';
const fileTypeFromBuffer = async (buf: Buffer) =>
  (await import('file-type')).fileTypeFromBuffer(buf);

@Controller('time-off-request')
export class TimeOffRequestController {
  constructor(private readonly timeOffRequestService: TimeOffRequestService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  create(
    @Body() createTimeOffRequestDto: CreateTimeOffRequestDto,
    @UploadedFile() file,
  ) {
    console.log({
      gotFile: !!file,
      field: file?.fieldname,
      name: file?.originalname,
      type: file?.mimetype,
      size: file?.size,
      hasBuffer: !!file?.buffer,
    });

    return this.timeOffRequestService.create(createTimeOffRequestDto, file);
  }

  @Get('/all')
  findAll() {
    return this.timeOffRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.timeOffRequestService.findOne(+id);
  }

  @Get(':id/document')
  async getDocument(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const rec = await this.timeOffRequestService.getRawBlobByRequestId(id);
    if (!rec) throw new NotFoundException('No document');

    const type = await fileTypeFromBuffer(rec);
    const mime = type?.mime ?? 'application/octet-stream';
    const filename = `request-${id}.${type?.ext ?? 'bin'}`;

    res.setHeader('Content-Type', mime);
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Content-Length', String(rec.length));
    res.setHeader('Cache-Control', 'private, max-age=300');

    return res.end(rec);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTimeOffRequestDto: UpdateTimeOffRequestDto,
  ) {
    return this.timeOffRequestService.update(+id, updateTimeOffRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.timeOffRequestService.remove(+id);
  }
}
