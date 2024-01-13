import { Socket } from "socket.io";

export interface User {
  socket: Socket;
  name: String;
}

let GLOBAL_ROOM_ID = 1;
export class UserManager {
  private users: User[];
  private queue: String[]; // consists of socketId s

  constructor() {
    this.users = [];
    this.queue = [];
  }

  addUser(name: String, socket: Socket) {
    this.users.push({ name, socket });
  }
  removeUser(socketId: String) {
    this.users = this.users.filter((x) => x.socket.id == socketId);
    this.queue = this.queue.filter((x) => x === socketId);
  }
  clearQueue() {
    if (this.queue.length > 2) return;

    const user1 = this.users.filter((x) => x.socket.id === this.queue.pop());
    const user2 = this.users.filter((x) => x.socket.id === this.queue.pop());
    //now we have 2 users , now we nee to perform SDP exchange to make them talk to eachother
    const roomId = this.generate();
  }
  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
