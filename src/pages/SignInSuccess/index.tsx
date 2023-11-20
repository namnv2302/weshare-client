import { useEffect } from 'react';
import { loginSuccess } from '@apis/auth';

const SignInSuccessPage = () => {
  useEffect(() => {
    (async () => {
      const resp = await loginSuccess();
      console.log(resp.data);
    })();
  }, []);

  return <h2>Redirect to Home</h2>;
};

export default SignInSuccessPage;
