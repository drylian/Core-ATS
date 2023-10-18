import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para verificar a presença de alternightuser, cookie alternightuser ou autorização na solicitação.
 *
 * @param {Request} req - O objeto de solicitação do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @param {NextFunction} next - A função para continuar o fluxo da solicitação.
 * @returns {void}
 */
export default function CheckRequest(req: Request, res: Response, next: NextFunction) {
  const acceptHeader = req.headers.accept || '';
  const hasAlternightUserHeader = typeof req.headers.alternightuser === 'string';
  const hasAlternightUserCookie = req.cookies.alternightuser !== undefined;
  const hasAuthorizationHeader = req.headers.authorization !== undefined;

  if (hasAlternightUserHeader || hasAlternightUserCookie || hasAuthorizationHeader) {
    if (hasAlternightUserHeader) req.checked = 'user';
    if (hasAlternightUserCookie) req.checked = 'user';
    if (hasAuthorizationHeader) req.checked = 'authorization';
    next();
  } else {
    if (acceptHeader.includes('text/html')) return res.redirect('/auth/login');
    if (acceptHeader.includes('application/json')) return res.status(401).json({ message: 'O Token de autorização está ausente.' });
    if (acceptHeader.includes('text/plain')) return res.status(401).send('O Token de autorização está ausente.');
    if (acceptHeader.includes('text/html')) return res.status(406).send('Request inválida.');
  }
}
