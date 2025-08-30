import { User } from 'better-auth';

export type SocketUser = {
  userId: string;
  socketId: string;
  profile: User;
};
