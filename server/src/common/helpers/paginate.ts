import { Request } from 'express';

export const paginate = (req: Request) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
  const skip = (page - 1) * limit;
  const search = (req.query.search as string)?.trim() || '';

  return {
    page,
    limit,
    skip,
    search,
  };
};
