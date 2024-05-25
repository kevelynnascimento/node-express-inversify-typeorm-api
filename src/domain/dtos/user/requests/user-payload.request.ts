import express from "express";

export interface UserPayloadRequest {
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export default interface UserContextRequest extends express.Request {
  user: UserPayloadRequest
}