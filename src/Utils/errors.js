import createError from 'http-errors'

export function catch404(app) {
  app.use((req, res, next) => {
    next(createError(404))
  })
}

export function handleErrors(app) {
  app.use((err, req, res, next) => {
    console.log(err)
    if (!err.status) err.status = 500
    res.json(err)
  })
}
