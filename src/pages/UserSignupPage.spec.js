import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserSignupPage } from './UserSignupPage';

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Sign Up');
    });

    it('has input for display name', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Display Name');
      expect(displayNameInput).toBeInTheDocument();
    });

    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText('Username');
      expect(usernameInput).toBeInTheDocument();
    });

    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Password');
      expect(passwordInput).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Password');
      expect(passwordInput.type).toBe('password');
    });

    it('has input for password repeat', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText('Repeat Password');
      expect(passwordRepeat).toBeInTheDocument();
    });

    it('has password type for password repeat input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText('Repeat Password');
      expect(passwordRepeat.type).toBe('password');
    });

    it('has sumit button', () => {
      const { container } = render(<UserSignupPage />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };

    let button,
      displayNameInput,
      usernameInput,
      passwordInput,
      passwordRepeatInput;

    const setupForSubmit = (props) => {
      const rendered = render(<UserSignupPage {...props} />);

      const { container, queryByPlaceholderText } = rendered;
      displayNameInput = queryByPlaceholderText('Display Name');
      usernameInput = queryByPlaceholderText('Username');
      passwordInput = queryByPlaceholderText('Password');
      passwordRepeatInput = queryByPlaceholderText('Repeat Password');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

      button = container.querySelector('button');

      return rendered;
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };

    it('sets the displayName value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Display Name');
      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      expect(displayNameInput).toHaveValue('my-display-name');
    });

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText('Username');
      fireEvent.change(usernameInput, changeEvent('my-username-name'));
      expect(usernameInput).toHaveValue('my-username-name');
    });

    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Password');
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      expect(passwordInput).toHaveValue('P4ssword');
    });

    it('sets the password repeat value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText('Repeat Password');
      fireEvent.change(passwordRepeat, changeEvent('P4ssword'));
      expect(passwordRepeat).toHaveValue('P4ssword');
    });

    it('calls postSignup when the fields are valid and the actions are provided in props', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('does not throw exception when clicking the button when actions not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('calls post with user body when the fields are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);
      const expectedUserObject = {
        username: 'my-user-name',
        displayName: 'my-display-name',
        password: 'P4ssword',
      };
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });

    it('does not allow user to click the Sign Up button when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('displays spinner when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      const { queryByText } = setupForSubmit({ actions });

      fireEvent.click(button);

      const spinner = queryByText('Loading...');
      expect(spinner).toBeInTheDocument();
    });

    it('hides apinner after api call finishes successfully', async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitFor(() => {
        const spinner = queryByText('Loading...');
        expect(spinner).not.toBeInTheDocument();
      });
    });

    it('hides apinner after api call finishes with error', async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({
                response: {
                  data: {},
                },
              });
            }, 300);
          });
        }),
      };

      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitFor(() => {
        const spinner = queryByText('Loading...');
        expect(spinner).not.toBeInTheDocument();
      });
    });

    it('displays validation error for displayName when error is received for the field', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              },
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitFor(() => {
        const errorMessage = queryByText('Cannot be null');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('enables the signup button when password and repeat password have same value', () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });

    it('disables the signup button when password repeat does not match password', () => {
      setupForSubmit();
      fireEvent.change(passwordRepeatInput, changeEvent('new-pass'));
      expect(button).toBeDisabled();
    });

    it('disables the signup button when password does not match password repeat', () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent('new-pass'));
      expect(button).toBeDisabled();
    });

    it('displays error style for password repeat input when password repeat mismatch', () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordRepeatInput, changeEvent('new-pass'));
      const mismatchWarning = queryByText('Does not match to password');
      expect(mismatchWarning).toBeInTheDocument();
    });

    it('displays error style for password repeat input when password input mismatch', () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordInput, changeEvent('new-pass'));
      const mismatchWarning = queryByText('Does not match to password');
      expect(mismatchWarning).toBeInTheDocument();
    });

    it('hides the validation error when user changes the content of displayName', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              },
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitFor(() => {
        const errorMessage = queryByText('Cannot be null');
        expect(errorMessage).toBeInTheDocument();
      });
      fireEvent.change(displayNameInput, changeEvent('name updated'));
      await waitFor(() => {
        const errorMessage = queryByText('Cannot be null');
        expect(errorMessage).not.toBeInTheDocument();
      });
    });

    it('hides the validation error when user changes the content of username', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                username: 'Username cannot be null',
              },
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitFor(() => {
        const errorMessage = queryByText('Username cannot be null');
        expect(errorMessage).toBeInTheDocument();
      });
      fireEvent.change(usernameInput, changeEvent('name updated'));
      await waitFor(() => {
        const errorMessage = queryByText('Username cannot be null');
        expect(errorMessage).not.toBeInTheDocument();
      });
    });

    it('hides the validation error when user changes the content of password', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                password: 'Cannot be null',
              },
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitFor(() => {
        const errorMessage = queryByText('Cannot be null');
        expect(errorMessage).toBeInTheDocument();
      });
      fireEvent.change(passwordInput, changeEvent('passwordUpdated'));
      await waitFor(() => {
        const errorMessage = queryByText('Cannot be null');
        expect(errorMessage).not.toBeInTheDocument();
      });
    });
  });
});

console.error = () => {};
