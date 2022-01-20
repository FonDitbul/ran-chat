import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}
@Injectable()
export class dataInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
interface URLParser<T> {
  name: string;
  url: string;
}
const checkName = (url) => {
  if (url === 'board') return '자유 게시판';
  if (url === 'public-chat') return '공개 채팅방';
  if (url === 'chat') return '랜덤 채팅';
  if (url === 'personalchat') return '1대1 채팅방';
};
@Injectable()
export class returnInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const originalUrl = context
      .switchToHttp()
      .getRequest()
      .originalUrl.split('/');
    const name = checkName(originalUrl[1]);
    const temp = { name: name, url: originalUrl[1] };
    return next.handle().pipe(
      map((data) => ({
        title: temp.name,
        breads: [temp, data.breadsOne],
        ...data,
      })),
    );
  }
}
