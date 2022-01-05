"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // javascrip 2015
const socket_io_1 = require("socket.io");
const http = __importStar(require("http"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const websocketServer = new socket_io_1.Server(server);
app.use(express_1.default.static('static'));
app.post('/api', (req, res) => {
    const resultModel = {
        name: 'wgs',
        age: 41,
        gender: 'M',
    };
    res.send(resultModel);
});
app.get('/', (req, resp) => {
    resp.send('<h1>hello</h1>');
});
app.get('/wgs', (req, resp) => {
    resp.send('<h1>wgs</h1>');
});
server.listen(3000, () => {
    console.log('server load....');
});
const wsListen = websocketServer.of('/socket.io');
wsListen.on('connection', serverSocket => {
    console.log('소켓 요청이 와서 서버 소캣을 만들었어요 - ' + serverSocket.id);
    serverSocket.on('disconnect', reason => {
        console.log(reason);
    });
});
