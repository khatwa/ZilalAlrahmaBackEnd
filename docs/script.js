let mainTable = document.getElementById('mainTable')

function createRouter(route) {
  return `<tr>
        <td>${route.routerName}</td>
        <td>${route.method}</td>
        <td>${route.params}</td>
        <td>${route.body}</td>
        <td>${route.headers}</td>
        <td>${route.query}</td>
        <td>${route.response}</td>
        <td class="${route.type == 'protected' ? 'protected' : 'public'}">${
    route.type
  }</td>
        </tr>`
}

function createHeader(name) {
  return `<p style="font-size:18px">${name}</p><tr class="table-header">
    <th>Route Name</th>
    <th>Method</th>
    <th>Params</th>
    <th>Body</th>
    <th>Headers</th>
    <th>Query</th>
    <th>Response</th>
    <th>Type</th>
</tr>`
}

function createUlAndAppendRoute(routeArray) {
  mainTable.insertAdjacentHTML('beforeend', createHeader(routeArray.name))
  for (let route of routeArray.data) {
    mainTable.insertAdjacentHTML('beforeend', createRouter(route))
  }
}

// get routers from json file
readJsonFile('./routers.json', function(text) {
  const {
    authentication,
    organizations,
    posts,
    meetings,
    volunteers,
    supporters,
  } = JSON.parse(text)
  //   console.log(data.authentication)
  createUlAndAppendRoute({
    data: authentication,
    name: 'Authentication Routers',
  })
  createUlAndAppendRoute({
    data: organizations,
    name: 'Organizations Routers',
  })
  createUlAndAppendRoute({
    data: posts,
    name: 'posts Routers',
  })
  createUlAndAppendRoute({
    data: meetings,
    name: 'meetings Routers',
  })
  createUlAndAppendRoute({
    data: volunteers,
    name: 'volunteers Routers',
  })
  createUlAndAppendRoute({
    data: supporters,
    name: 'supporters Routers',
  })
})

// read json files from local files
function readJsonFile(file, cb) {
  let rawFile = new XMLHttpRequest()
  rawFile.open('get', file)
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      cb(rawFile.responseText)
    }
  }
  rawFile.send(null)
}
