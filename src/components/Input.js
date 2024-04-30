import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  hasError,
  error,
  onChange = () => {},
}) => {
  let inputClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark: dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  inputClassName += ' form-control';

  const inputErrorClass =
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500';
  const inputSuccessClass =
    'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500';

  if (hasError !== undefined) {
    inputClassName += hasError
      ? ` is-invalid ${inputErrorClass}`
      : ` is-valid ${inputSuccessClass}`;
  }

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        name={label}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {hasError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
