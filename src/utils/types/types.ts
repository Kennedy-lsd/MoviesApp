import { Request } from 'express';

export type UserData = {
    image: string
    email: string
    username: string
    password: string
}

export type VideoType = {
    title: string
    url: string
    description: string
    imageId: string
}

export type ImageData = {
    image: string
    
}

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}