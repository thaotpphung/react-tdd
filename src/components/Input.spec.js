import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Layout', () => {
  it('has input item', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('displays the label provided in props', () => {
    const { queryByText } = render(<Input label="Test label" />);
    const label = queryByText('Test label');
    expect(label).toBeInTheDocument();
  });

  it('does not display the label when no label provided in props', () => {
    const { container } = render(<Input />);
    const label = container.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });

  it('has text type for input when type is not provided as prop', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input.type).toBe('text');
  });

  it('has password type for input when password type is provided as prop', () => {
    const { container } = render(<Input type="password" />);
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
  });

  it('displays placeholder when it is provided as prop', () => {
    const { container } = render(<Input placeholder="Test placeholder" />);
    const input = container.querySelector('input');
    expect(input.placeholder).toBe('Test placeholder');
  });

  it('has value for input when it is provided as prop', () => {
    const { container } = render(<Input value="Test value" />);
    const input = container.querySelector('input');
    expect(input.value).toBe('Test value');
  });

  it('has onChange callback when it is provided as prop', () => {
    const onChange = jest.fn();
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'new-input' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('has default style when there is no validation error or success', () => {
    const onChange = jest.fn();
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector('input');
    expect(input.className).toContain('form-control');
  });

  it('has success style when hasError property is false', () => {
    const { container } = render(<Input hasError={false} />);
    const input = container.querySelector('input');
    expect(input.className).toContain('form-control is-valid');
  });

  it('has error style when hasError property is true', () => {
    const { container } = render(<Input hasError={true} />);
    const input = container.querySelector('input');
    expect(input.className).toContain('form-control is-invalid');
  });

  it('displays the error text when it is provided', () => {
    const { queryByText } = render(
      <Input hasError={true} error="Cannot be null" />
    );
    expect(queryByText('Cannot be null')).toBeInTheDocument();
  });

  it('does not display the error text when hasError is not provided', () => {
    const { queryByText } = render(<Input error="Cannot be null" />);
    expect(queryByText('Cannot be null')).not.toBeInTheDocument();
  });
});
