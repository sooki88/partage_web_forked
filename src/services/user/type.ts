export type User = {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string | null;
  profile_image: string | null;
};

// 회원 정보 조회
export type GetUserResponse = {
  user: User;
};
