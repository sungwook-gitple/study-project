export function checkRequired(params: Record<string, any>, required: string[]) {
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