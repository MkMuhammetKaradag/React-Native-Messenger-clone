import { UserDetails } from "../../auth/model";

export interface ActiveFriend extends UserDetails {
  isActive: boolean;
}
