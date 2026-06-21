import { User, IUser } from '../models/User';

export class UserService {
  static async findByEmail(email: string) {
    const user = await User.findOne({ email }).lean() as any;
    if (!user) return null;
    return {
      ...user,
      id: user._id ? user._id.toString() : user.id
    };
  }

  static async findById(id: string) {
    const user = await User.findById(id).lean() as any;
    if (!user) return null;
    return {
      ...user,
      id: user._id ? user._id.toString() : user.id
    };
  }

  static async createUser(userData: { email: string; passwordHash: string; name: string }) {
    const newUser = new User({
      email: userData.email,
      password: userData.passwordHash,
      name: userData.name,
      role: 'viewer'
    });
    const saved = await newUser.save();
    const savedObj = saved.toObject() as any;
    return {
      ...savedObj,
      id: savedObj._id ? savedObj._id.toString() : savedObj.id
    };
  }

  static async getAllUsers() {
    const users = await User.find({}, '-password').lean() as any[];
    return users.map(user => ({
      ...user,
      id: user._id ? user._id.toString() : user.id
    }));
  }
}

