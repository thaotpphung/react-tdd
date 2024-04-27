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

  const inputs = [
    {
      label: 'Display Name',
      value: displayName,
      setValue: setDisplayName,
    },
    {
      label: 'Username',
      value: username,
      setValue: setUsername,
    },
    {
      label: 'Password',
      value: password,
      setValue: setPassword,
      type: 'password',
    },
    {
      label: 'Repeat Password',
      value: passwordRepeat,
      setValue: setPasswordRepeat,
      type: 'password',
    },
  ];

  return (
    <div>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 ms-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign Up
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                {inputs.map(({ label, value, setValue, type }) => {
                  return (
                    <div>
                      <label
                        for={label}
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        name={label}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark: dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={label}
                        value={value}
                        onChange={(event) => {
                          setValue(event.target.value);
                        }}
                      />
                    </div>
                  );
                })}
                <div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={onClickSignup}
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { UserSignupPage };
