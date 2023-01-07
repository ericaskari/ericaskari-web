import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ContactRequest, ContactResponse } from '@ericaskari/shared/model';
import { ContactService } from '@ericaskari/api/core';

// Auto generated file with generate:api npm command

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private service: ContactService) {}

    @Post()
    sendContactForm(@Body() bodyRequest: ContactRequest): Promise<ContactResponse> {
        return this.service.sendContactForm(bodyRequest);
    }
}
