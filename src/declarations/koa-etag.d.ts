
import * as Koa from 'koa';

declare function etag(opts?: {}): Koa.Middleware;
declare namespace etag {}
export = etag;
