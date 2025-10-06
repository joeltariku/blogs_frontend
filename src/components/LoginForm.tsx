type LoginFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const LoginForm = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
}: LoginFormProps) => {
  return (
    <>
      <h2>Log in to view blogs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              data-testid="username-input"
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              data-testid="password-input"
            />
          </label>
        </div>
        <input type="submit" value="login" id="login-submit" data-testid="login-submit"/>
      </form>
    </>
  );
};

export default LoginForm;
