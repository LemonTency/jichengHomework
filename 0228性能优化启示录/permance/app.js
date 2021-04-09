const http = require("http")
const memeye = require("memeye")

memeye();

let str = ''
for (let i = 1; i < 10000; i++) {
  str = str + 'a'
}

const s = str
const bufStr = Buffer.from(str)

const server = http.createServer((req, res) => {
  if (req.url == '/buffer') {
    res.end(bufStr)
  } else {
    res.end(str)
  }
})

server.listen(9000)