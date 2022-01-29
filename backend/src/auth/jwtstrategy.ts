import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JWTPayload } from "./jwtpayload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: configService.get('jwt.ignoreExpiration'),
            secretOrKey: configService.get('jwt.secret'),
        });
    }

    async validate(payload: JWTPayload){
        return payload;
    }
}