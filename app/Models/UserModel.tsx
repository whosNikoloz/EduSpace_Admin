interface UserModel {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  picture: string | null;
  passwordHash: string;
  passwordSalt: string;
  verificationToken: string;
  verifiedAt: string;
  passwordResetToken: string | null;
  resetTokenExpires: string | null;
  role: string;
  oAuthProvider: string | null;
  oAuthProviderId: string | null;
  enrollments: any[];
  notifications: any | null;
  posts: any | null;
  comments: any | null;
  progresses: any | null;
  lastActivity: string;
  plan: string | null;
}
