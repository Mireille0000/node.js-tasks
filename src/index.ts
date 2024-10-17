import { createServer } from "node:http";
import { buffer } from "node:stream/consumers";

console.log('Hello, Node');
const server = createServer((res, req) => {
    res.statusCode = 200;
    res.statusMessage = 'Works';
    req.setHeader('Content-type', 'data');
    req.write(JSON.stringify({message: 'Request completed'}));
    req.end();
    
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
});