import { Socket } from "socket.io";
const express = require("express");
const { Server } = require("socket.io");
const { http } = require("http");

const app = express();

const server = http.createServer(http);
const io = new Server(server);

io.on("connection", (socker: Socket) => {
  console.log("a use r coneetedd");
});

app.listen(3000, () => {});
