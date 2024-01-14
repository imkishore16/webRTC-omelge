import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
export interface User {
  socket: Socket;
  name: String;
}

let GLOBAL_ROOM_ID = 1;
export class UserManager {
  private users: User[];
  private queue: String[]; // consists of socketId s
  private roomManager: RoomManager;

  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
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

    const user1 = this.users.find((x) => x.socket.id === this.queue.pop());
    const user2 = this.users.find((x) => x.socket.id === this.queue.pop());
    //now we have 2 users , now we nee to perform SDP exchange to make them talk to eachother
    if (!user1 || !user2) return;
    const room = this.roomManager.createRomm(user1, user2);
  }
}
