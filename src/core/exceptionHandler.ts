const catchError = async (error: any) => {
  return new Promise(resolve => {
    let errorMsg = 'Ops! Something went wrong.'
    if (error) {
      if (!!error.data && !!error.data.message) {
        errorMsg = error.data.message as string
      } else {
        if (error.status === 404) {
          errorMsg = '404: URL Not Found'
        }
        if (error.status === 500) {
          errorMsg = '500: Internal Server error.'
        }
      }
    }
    resolve(errorMsg)
  })
}

export const exceptionHandler = {
  catchError
}
