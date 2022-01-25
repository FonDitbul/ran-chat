import { Logger, QueryRunner } from 'typeorm';

export class MyCustomLogger implements Logger {
  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): any {}

  logMigration(message: string, queryRunner?: QueryRunner): any {}

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    // console.log(query);
    /*    const queryList = query.split(',');
    const reservedWord = ['SELECT', 'FROM'];
    for (const queries of queryList) {
      if (queries in reservedWord) {
        console.log(`%c${queries}`, 'color: #a4f644; background-color: #000;');
      } else {
        console.log(queries);
      }
    }*/
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {}

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {}

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {}
  // implement all methods from logger class
}
