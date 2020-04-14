// create a static object from express built-in object for controller's use
export function expressReqObject(req, res) {

  const reqObject = {
    body: req.body,
    headers: req.headers,
    query: req.query,
    params: req.params,
    file: req.file,
    files: req.files,
  }
  const resObject = {
    send: function (s) {
      res.send(s)
      return this
    },
    json: function (j) {
      res.json(j)
      return this
    },
    status: function (s) {
      res.status(s)
      return this
    },
  }
  return { reqObject, resObject }
}
