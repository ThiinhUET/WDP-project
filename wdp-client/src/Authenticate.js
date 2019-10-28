const Auth = {
    isAuthenticated: false,
    signin(cb) {
      Auth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      Auth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};
export default Auth;