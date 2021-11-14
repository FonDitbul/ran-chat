import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicChatDto } from './create-public-chat.dto';

export class UpdatePublicChatDto extends PartialType(CreatePublicChatDto) {}
