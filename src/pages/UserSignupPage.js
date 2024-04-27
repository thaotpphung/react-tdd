import React from 'react';
import { useState } from 'react';

const UserSignupPage = ({
  actions = {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
}) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onClickSignup = () => {
    const user = {
      username,
      password,
      displayName,
    };
    actions.postSignup(user);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          placeholder="Your display name"
          value={displayName}
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="Your username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="Repeat your password"
          type="password"
          value={passwordRepeat}
          onChange={(event) => {
            setPasswordRepeat(event.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={onClickSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export { UserSignupPage };
