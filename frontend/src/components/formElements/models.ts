export interface RadioButtonProps {
  options: Array<{ value: string; title: string }>;
  input: {
    name: string;
    value: string;
  };
  label: string;
  inline: boolean;
  required: boolean;
  meta: {
    touched: boolean;
    error: string;
    warning: string;
  };
}

export interface TextFieldProps {
  input: {
    name: string;
    value: string;
    onBlur: () => void;
  };
  readonly: boolean;
  feedback: boolean;
  label: string;
  defaultValue: string;
  placeholder: string;
  className: string;
  type: string;
  errorState: string | null;
  errorsVisible: boolean;
  required: boolean;
  meta: {
    touched: boolean;
    error: string;
    warning: string;
  };
}

export interface TextareaFieldProps {
  input: {
    name: string;
    value: string;
  };
  label: string;
  defaultValue: string;
  readonly: boolean;
  feedback: boolean;
  placeholder: string;
  className: string;
  errorsVisible: boolean;
  meta: {
    touched: boolean;
    error: string;
    warning: string;
  };
  rows: number | null;
  required: boolean;
}

export interface SelectFieldProps {
  input: {
    name: string;
    value: string;
  };
  id: string;
  label: string;
  multiple: boolean;
  options: Array<{
    value: string;
    title: string;
  }>;
  meta: {
    touched: boolean;
    error: string;
    warning: string;
  };
  required: boolean;
}
