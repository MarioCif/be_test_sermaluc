import { Module } from '@nestjs/common';
import { BcryptjsAdapter } from './adapter/bcryptjs.adapter';

@Module({
  providers: [BcryptjsAdapter],
  exports: [BcryptjsAdapter],
})
export class CommonModule {}
