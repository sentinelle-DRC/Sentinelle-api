import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async test() {
    const payload = { name: 'melki' };
    const token = this.jwtService.sign(payload, {
      secret: 'MIEL',
    });
    return token;
  }
}
