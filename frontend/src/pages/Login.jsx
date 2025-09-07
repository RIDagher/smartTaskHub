import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="pt-20">
      {/* Added padding-top to avoid overlapping with the fixed Navbar */}
      <LoginForm />
    </div>
  );
};

export default Login;