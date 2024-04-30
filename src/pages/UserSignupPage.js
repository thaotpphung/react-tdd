import React from 'react';
import { useState } from 'react';
import Input from '../components/Input';

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
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordRepeatConfirmed, setPasswordRepeatConfirmed] = useState(true);

  const onClickSignup = async () => {
    const user = {
      username,
      password,
      displayName,
    };
    try {
      setPendingApiCall(true);
      await actions.postSignup(user);
      setPendingApiCall(false);
    } catch (error) {
      setPendingApiCall(false);
      let newErrors = { ...errors };
      if (error.response.data && error.response.data.validationErrors) {
        newErrors = { ...error.response.data.validationErrors };
        setErrors(newErrors);
      }
    }
  };

  const disabledButtonClass =
    'mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500';

  const buttonClass =
    'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800';

  const disabledButton = pendingApiCall || !passwordRepeatConfirmed;

  const inputs = [
    {
      label: 'Display Name',
      value: displayName,
      onChange: (event) => {
        setDisplayName(event.target.value);
        const newErrors = { ...errors };
        delete newErrors.displayName;
        setErrors(newErrors);
      },
      stateName: 'displayName',
    },
    {
      label: 'Username',
      value: username,
      onChange: (event) => {
        setUsername(event.target.value);
        const newErrors = { ...errors };
        delete newErrors.username;
        setErrors(newErrors);
      },
      stateName: 'username',
    },
    {
      label: 'Password',
      value: password,
      onChange: (event) => {
        const value = event.target.value;
        setPassword(value);
        const isValid = value === passwordRepeat;
        setPasswordRepeatConfirmed(isValid);
        const newErrors = { ...errors };
        delete newErrors.password;
        newErrors.passwordRepeat = isValid ? '' : 'Does not match to password';
        setErrors(newErrors);
      },
      type: 'password',
      stateName: 'password',
    },
    {
      label: 'Repeat Password',
      value: passwordRepeat,
      onChange: (event) => {
        const value = event.target.value;
        setPasswordRepeat(value);
        const isValid = value === password;
        setPasswordRepeatConfirmed(isValid);
        const newErrors = { ...errors };
        newErrors.passwordRepeat = isValid ? '' : 'Does not match to password';
        setErrors(newErrors);
      },
      type: 'password',
      stateName: 'passwordRepeat',
    },
  ];

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 ms-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign Up
              </h1>
              <form className="space-y-4 md:space-y-6">
                {inputs.map(({ label, value, onChange, type, stateName }) => {
                  return (
                    <Input
                      key={label}
                      hasError={errors[stateName] && true}
                      error={errors[stateName]}
                      label={label}
                      placeholder={label}
                      value={value}
                      onChange={onChange}
                      type={type}
                    />
                  );
                })}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`${
                      disabledButton ? disabledButtonClass : buttonClass
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      onClickSignup();
                    }}
                    disabled={disabledButton}
                  >
                    <div role="status">
                      {pendingApiCall && (
                        <>
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </>
                      )}
                      <span>Sign Up</span>
                    </div>
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
