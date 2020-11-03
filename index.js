const http = require('http')

let data = []

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url.split('/').length == 2) {
        const id = req.url.split('/')[1]
        if (id > 0) {
            res.writeHead(200, 'Content=Type', 'application/json')
            res.end(JSON.stringify({
                data: data[id]
            }))
        }
        else {
            res.writeHead(200, 'Content=Type', 'application/json')
            res.end(JSON.stringify({
                data
            }))
        }
    }

    else if (req.method === "POST" && req.url === "/") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            data.push(JSON.parse(body).name)
            res.end(body)
        });
    }
    else if (req.method === "DELETE" && req.url.split('/').length == 2) {
        const id = req.url.split('/')[1]
        if (id > 0) {
            res.writeHead(200, 'Content=Type', 'application/json')
            data.splice(id, 1)
            res.end(JSON.stringify({
                message: `item ${id} deleted`
            }))
        }
        else {
            res.writeHead(404)
            res.end()
        }
    }
    else if (req.method === "PUT" && req.url.split('/').length == 2) {
        const id = req.url.split('/')[1]
        if (id > 0) {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                data[id] == JSON.parse(body).name
                data = data.map((value, index) => {
                    if (index == id) {
                        return JSON.parse(body).name
                    }
                    else {
                        return value
                    }
                })
                res.end(body)
            });
        }
        else {
            res.writeHead(404)
            res.end()
        }
    }
    else {
        res.writeHead(404)
        res.end()
    }
})

server.listen(3000)