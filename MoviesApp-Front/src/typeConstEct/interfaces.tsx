export interface NavBarProps {
  username: string;
  avatar: string;
  onLogout: () => void;
}

export interface LoginParams {
  username: string;
  email: string;
  password: string;
  userImg: string | null;
}

export interface AuthError {
  message: string;
}

export interface Film {
  Videotable: {
    id: string;
    title: string;
    url: string;
    description: string;
    group: string;
    imageId: string | null;
  };
  Imageforvideotable: {
    id: string
    image: string | null;
  };
}
