import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

const checkName = (url) => {
  if (url === 'board') return '자유 게시판';
  if (url === 'public-chat') return '공개 채팅방';
  if (url === 'random-chat') return '랜덤 채팅';
  if (url === 'personal-chat') return '1대1 채팅방';
  if (url.split('?')[1]) return checkName(url.split('?')[0]);
};
@Injectable()
export class breadsInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const originalUrl = context
      .switchToHttp()
      .getRequest()
      .originalUrl.split('/');
    const name = checkName(originalUrl[1]);
    const temp = { name: name, url: originalUrl[1] };
    return next.handle().pipe(
      map((data) => {
        if (data.breadsOne)
          return {
            title: temp.name,
            breads: [temp, data.breadsOne],
            ...data,
          };
        return {
          title: temp.name,
          breads: [temp],
          ...data,
        };
      }),
    );
  }
}
