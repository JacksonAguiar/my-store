class UserService {
  apiUrl;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async signIn(email: string, password: string) {
    try {
      const response = await fetch(`${this.apiUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }
}

export default UserService;
