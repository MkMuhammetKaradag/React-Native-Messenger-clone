import { UserDetails } from "../../../shared/auth/model";

export interface FriendRequest {
  id: number;
  creator: UserDetails;
  receiver: UserDetails;
}
