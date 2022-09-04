export function checkRequired<T = Record<string, any>>(params: T, required: (keyof T)[]) {
  const missed = required.filter(key => !params[key]);

  if (missed.length) {
    return {
      result: 'fail',
      message: 'required',
      data: missed,
    };
  }

  return {
    result: 'success'
  };
}

export function validateRequired<T = Record<string, any>>(params: T, required: (keyof T)[]): {
  result: 'fail'
  message: string
  missed: (keyof T)[]
} | {
  result: 'success'
  data: T
} {
  const missed = required.filter(key => !params[key]);

  if (missed.length) {
    return {
      result: 'fail',
      message: 'required',
      missed,
    };
  }

  return {
    result: 'success',
    data: params
  };
}
