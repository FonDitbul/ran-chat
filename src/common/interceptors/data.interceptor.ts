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

@Injectable()
export class returnInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const breads = { name: '자유 게시판' };
    return next.handle().pipe(
      map((data) => ({
        title: '게시판 테스트 ㅋㅋ',
        breads: data.breads,
        data: data.board,
      })),
    );
  }
}
