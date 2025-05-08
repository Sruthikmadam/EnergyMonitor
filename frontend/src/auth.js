export function isAuthenticated() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return !!tokenCookie;
  }
  export function login(token) {
    document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
  }

  export function logout() {
    document.cookie = "token=; path=/; max-age=0"; // Expire it immediately
  }