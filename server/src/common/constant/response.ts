export const RESPONSE_SUCCESS = (data: any) => ({
  success: true,
  data,
  error: null,
});

export const RESPONSE_ERROR = (message: string) => ({
  success: false,
  data: null,
  error: message,
});
