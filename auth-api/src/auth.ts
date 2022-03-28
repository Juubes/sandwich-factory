import crypto from "crypto";

let userDatabase: { user: string; passwordHash: string; salt: string }[] = [];

let sessionStore: Map<string, { user: string; token: string }> = new Map();

export function checkAuth(sessionToken: string): boolean {
  return !!getUserIdFromSession(sessionToken);
}

export function parseSessionToken(cookie: string): string {
  return "A578B98989CFD90";
}

export function register(user: string, password: string): string | null {
  // Test if user is already registered
  // Would be easier with indexes and binarysearch
  for (let dbUser of userDatabase) {
    if (dbUser.user === user) {
      // User already exists
      return null;
    }
  }

  // Generate salt to make bruteforcing more difficult
  let salt = Math.floor(Math.random() * 1e20).toString(16);

  const passwordHash = hashPasswordWithSalt(password, salt);

  // Save user
  userDatabase.push({ user, passwordHash, salt });

  const newToken = generateTokenForUser(user);

  return newToken;
}

function hashPasswordWithSalt(password: string, salt: string): string {
  // Hash the password with salt
  const algo = crypto.createHash("sha256");
  algo.update(password + salt);
  const passwordHash = new String(algo.digest()).toString();
  return passwordHash;
}

/**@returns a new session token if user has logged in */
export function login(user: string, password: string) {
  // Hash password with salt

  for (const dbEntry of userDatabase) {
    if (dbEntry.user === user) {
      const salt = dbEntry.salt;
      const hashedPassword = hashPasswordWithSalt(password, salt);

      if (dbEntry.passwordHash !== hashedPassword) {
        // Incorrect password
        return null;
      }

      // Random token as hex
      return generateTokenForUser(user);
    }
  }

  // User cannot be found
  return null;
}
function generateTokenForUser(user: string): string {
  let token = Math.floor(Math.random() * 1e100).toString(16);
  sessionStore.set(user, { token, user });
  return token;
}
export function logout(username: string): boolean {
  return sessionStore.delete(username);
}

export function getUserIdFromSession(sessionToken: string): string {
  for (let user in sessionStore.keys()) {
    if (sessionStore.get(user)!.token === sessionToken) return user;
  }
  throw Error("Couldn't find user for token: " + sessionToken);
}
