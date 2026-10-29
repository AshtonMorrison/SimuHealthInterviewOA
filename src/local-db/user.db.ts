import type { User } from "../models/user.model"

class UserDB {
    private userMap = new Map<string, User>();

    // Create user with unique id
    createUser(username: string, password: string): User {
        const user: User = {
            id: crypto.randomUUID(),
            username,
            password,
        };
        this.userMap.set(user.id, user);
        return user;
    }

    // Check if user exists by username
    getUserByUsername(username: string): User | null {
        for (const user of this.userMap.values()) {
            if (user.username === username) {
                return user;
            }
        }
        return null;
    }
}


export const userDB = new UserDB();