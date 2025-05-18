export interface UserType {
  id: number;
  name: string;
  email: string;
  nickname: string;
  logInType: string;
  profileImage?: string;
  isOwner?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
// 필요한 경우에만 잓헝,,,/.
