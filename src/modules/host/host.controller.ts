import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateHostDto from './dto/create-host.dto.js';
import {HostServiceInterface} from './host-service.interface.js';
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {createJWT, fillDTO} from '../../utils/common.js';
import HostResponse from './response/host.response.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import LoginHostDto from './dto/login-host.dto.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import LoggedHostResponse from './response/logged-host.response.js';
import {JWT_ALGORITM} from './host.constant.js';

@injectable()
export default class HostController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.HostServiceInterface) private readonly hostService: HostServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for HostController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateHostDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginHostDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });
    this.addRoute({
      path: '/:userId/avatarUrl',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatarUrl'),
      ]
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateHostDto>,
    res: Response,
  ): Promise<void> {
    const existsHost = await this.hostService.findByEmail(body.email);

    if (existsHost) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'HostController'
      );
    }

    const result = await this.hostService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(HostResponse, result)
    );
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginHostDto>,
    res: Response,
  ): Promise<void> {
    const host = await this.hostService.verifyHost(body, this.configService.get('SALT'));

    if (!host) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }
    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      { email: host.email, id: host.id}
    );

    this.ok(res, fillDTO(LoggedHostResponse, {email: host.email, token}));
  }

  public async uploadAvatar(req: Request, res: Response) {
    console.log(req.file?.path);
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.hostService.findByEmail(req.user.email);

    this.ok(res, fillDTO(LoggedHostResponse, user));
  }
}
