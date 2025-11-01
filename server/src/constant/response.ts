export function successResponse(
  message: string,
  data: any = null,
  statusCode: number,
) {
  return {
    statusCode,
    message,
    ...(data && { data }),
  };
}
