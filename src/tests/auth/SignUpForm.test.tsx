jest.mock('@/components/auth/EmailInput', () => {
  return {
    __esModule: true,
    default: ({ placeholder, register, serverError, isChecked, onCheck, showCheckButton }: any) => {
      const { ref, ...rest } = register('email');
      return (
        <div>
          <input placeholder={placeholder} ref={ref} {...rest} />
          {showCheckButton && <button onClick={onCheck}>중복확인</button>}
          {serverError && <p>{serverError}</p>}
          {isChecked && <p>이메일 사용 가능</p>}
        </div>
      );
    },
  };
});

jest.mock('@/components/auth/PasswordInput', () => {
  return {
    __esModule: true,
    default: ({ placeholder, register, error }: any) => {
      const { ref, ...rest } = register('password');
      return (
        <div>
          <input placeholder={placeholder} ref={ref} {...rest} />;{error && <p>{error}</p>}
        </div>
      );
    },
  };
});
