import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptjsAdapter {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(enteredPassword: string, storedPassword: string) {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }
}
