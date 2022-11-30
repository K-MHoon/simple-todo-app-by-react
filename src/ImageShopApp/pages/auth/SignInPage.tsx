import React from 'react';
import SignInForm from '../../components/auth/SignInForm';
import SignLayout from '../../layout/SignLayout';

const SignInPage = () => {
  return (
    <SignLayout>
      <SignInForm />
    </SignLayout>
  );
};

export default SignInPage;
