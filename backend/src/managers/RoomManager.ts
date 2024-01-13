import { User } from "./UserManager";

interface Room {
  user1: User;
  user2: User;
}
let GLOBAL_ROOM_ID = 1;

export class RoomManager {
  private rooms: Map<String, Room>;
  constructor() {
    this.rooms = new Map<String, Room>();
  }

  createRomm(user1: User, user2: User) {
    const roomId = this.generate();
    //map
    this.rooms.set(roomId.toString(), { user1, user2 });

    user1.socket.emit("send-offer", {
      roomId,
    });
  }

  // Session Description Protocol (SDP) is a format for describing multimedia communication sessions for the purposes of announcement and invitation.
  onOffer(roomId: String, sdp: String) {
    const user2 = this.rooms.get(roomId)?.user1;
    user2?.socket.emit("offer", {
      sdp,
    });
  }
  onAnswer(roomId: String, sdp: string) {
    const user1 = this.rooms.get(roomId)?.user1;
    user1?.socket.emit("offer", {
      sdp,
    });
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
