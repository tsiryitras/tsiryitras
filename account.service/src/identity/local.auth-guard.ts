import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  /**
   * Check if current route is accessible
   * @param context Execution context
   * @returns Promise of boolean that specify if current resource is accessible or not
   */
  //   async canActivate(context: ExecutionContext): Promise<boolean> {
  //     const request = context.switchToHttp().getRequest();
  //     try {
  //       await super.canActivate(context);
  //       return request.user;
  //     } catch (err) {
  //       return false;
  //     }
  //   }
}
