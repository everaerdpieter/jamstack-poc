import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

type Handler = (data: any, context: CallableContext) => Promise<any> | any;
type MiddleWare = (data: any, context: CallableContext, next: Handler) => Handler;

export class HandlerFactory {
  private functionBuilder = functions.region('europe-west1');
  private middlewares: MiddleWare[] = [];

  addMiddleware(middleware: MiddleWare) {
    this.middlewares.push(middleware);
  }

  createHandler(onCall: Handler) {
    const onCallWithMiddleware = this.middlewares.reduce(
      (onCallReduce, middleware) => (data: any, context: CallableContext) =>
        middleware(data, context, onCallReduce),
      onCall
    );
    return this.functionBuilder.https.onCall(onCallWithMiddleware);
  }
}

export const errorHandlerMiddlware: MiddleWare = (data, context, next) => {
  try {
    return next(data, context);
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message);
  }
};

export const authenticationMiddleware: MiddleWare = (data, context, next) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication is required');
  }

  return next(data, context);
};

export function createHandlerWithDefaultMiddleware(onCall: Handler) {
  const factory = new HandlerFactory();
  factory.addMiddleware(errorHandlerMiddlware);
  factory.addMiddleware(authenticationMiddleware);
  return factory.createHandler(onCall);
}
