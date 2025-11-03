export const HTTP_RESPONSE = (
  data: any,
  message = 'Successfully',
  statusCode = 200,
) => ({
  statusCode,
  message,
  data,
});
