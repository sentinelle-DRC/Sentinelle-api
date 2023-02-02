import { PassportStrategy } from '@nestjs/passport'; 
import { Strategy, ExtractJwt } from 'passport-jwt'; 
import { Injectable } from '@nestjs/common'; 

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) { 
    
    constructor() { 
        super({ 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            ignoreExpiration: false, secretOrKey: 'your-jwt-secret', 
        }); 
    } 
    async validate(payload: any) {
        return { userId: payload.sub }; 
    } 
}