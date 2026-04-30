const LoginInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="login-input"
    />
  );
};

export default LoginInput;