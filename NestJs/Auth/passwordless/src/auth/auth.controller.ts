import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './strategy/magicLogin.strategy';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly strategy: MagicLoginStrategy) {}
    //POST /api/auth/login {email} -> send magic link
    @Post('login')
    async login(@Req() req, @Res() res, @Body(new ValidationPipe()) body: loginDto){
      this.authService.validateUser(body.destination);
      return this.strategy.send(req, res)
    }

    //GET /api/auth/callback?token=token=some-token -> JWT access token
    //AuthGuard('magiclogin') added to protect the route from unauthorized access
    @UseGuards(AuthGuard('magiclogin'))
    @Get('login/callback')
    async callback(@Req() req){
      //req.user contains the payload of the JWT
      return req.user;
    }
}
