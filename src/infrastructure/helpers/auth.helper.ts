import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserPayloadRequest } from '../../domain/dtos/user/requests/user-payload.request';

export class AuthHelper {
  public static readonly secret = process.env.JWT_SECRET;
  public static readonly tokenExpiration = process.env.JWT_TOKEN_EXPIRATION;

  public static generateToken(payload: object): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: this.tokenExpiration });
    return token;
  }

  public static verifyToken(token: string): UserPayloadRequest {
    try {
      const payload = jwt.verify(token, this.secret) as UserPayloadRequest;
      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error('Token expired:', error.message);
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error('Invalid token:', error.message);
      } else {
        console.error('Token verification error:', error.message);
      }
      return null;
    }
  }

  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
