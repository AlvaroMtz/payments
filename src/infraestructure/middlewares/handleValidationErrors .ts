import { validationResult } from 'express-validator'
import { type Request, type Response, type NextFunction } from 'express'

export function handleValidationErrors (
  req: Request,
  res: Response,
  next: NextFunction
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Response | void {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } else {
    next()
  }
}
