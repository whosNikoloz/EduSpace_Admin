import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  FC,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  createAuthCookie,
  deleteAuthCookie,
  getAuthCookie,
} from "@/actions/auth.action";

class User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  phoneNumber: string;
  role: string;
  oauth: string;
  joinedAt: string;
  plan: string | null;

  constructor(
    userId: number,
    userName: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string,
    phoneNumber: string,
    role: string,
    oauth: string,
    joinedAt: string,
    plan: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.oauth = oauth;
    this.joinedAt = joinedAt;
    this.plan = plan;
  }
}

interface UserContextType {
  user: User | null;
  login: (userToken: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

const EncodeJwtIntoUser = (userToken: string) => {
  const decodedToken: any = jwtDecode(userToken); // Decode the JWT token
  const userData = {
    userId: parseInt(
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ][0],
      10
    ),
    userName:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ][1],
    firstName:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ],
    lastName:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
      ],
    picture: decodedToken["ProfilePicture"],
    email:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    phoneNumber:
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
      ],
    role: decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
    oauth: decodedToken["Oauth"],
    joinedAt: decodedToken["joinedAt"],
    plan: decodedToken["Plan"],
  };
  return userData;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userJwt = await getAuthCookie();
        if (userJwt) {
          const userData = EncodeJwtIntoUser(userJwt);
          const decodedToken: any = jwtDecode(userJwt);
          const currentTime = new Date().getTime();
          const expirationTime = decodedToken.exp * 1000;

          if (currentTime < expirationTime) {
            setUser(userData);
          } else {
            await deleteAuthCookie();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user cookie:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (userToken: string): Promise<boolean> => {
    const userData = EncodeJwtIntoUser(userToken);
    if (userData.userId != null) {
      if (userData.role === "admin") {
        setUser(userData);
        await createAuthCookie(userToken);
        return true;
      } else {
        console.log("User is not an admin");
        setUser(null);
        await deleteAuthCookie();
        return false;
      }
    }
    return false; // Return false if user data is invalid
  };

  const logout = async () => {
    await deleteAuthCookie();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {loading ? <div className="h-screen bg-black"></div> : children}
    </UserContext.Provider>
  );
};
