import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage('please fill out all field');
      return; // Exit the function early
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      } else if (res.ok) {
        navigate('/home');
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen md:mt-48 mt-24 ">
      <div className="flex flex-col md:flex-row p-3 max-w-[80%] mx-auto  md:items-center gap-6 md:gap-4">
        <div className="flex-1">
          <Link
            to="/ "
            className="  text-sm sm:text-xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sahans
            </span>
            Blog
          </Link>
          <p className="text-1xl mt-5 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
            saepe nesciunt voluptates veritatis illo rerum
          </p>
        </div>

        <div className="  flex-1 ">
          <div className="flex justify-center items-center mb-5">
            <h1 className="text-2xl font-bold self-center p-5 ">Sign In</h1>
          </div>
          <form
            className=" flex flex-col justify-center "
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Your email" htmlFor="email"></Label>
              <TextInput
                type="email"
                id="email"
                placeholder="Enter Your email"
                className="w-[90%]"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" htmlFor="password"></Label>
              <TextInput
                type="password"
                id="password"
                placeholder="Password"
                className="w-[90%]"
                onChange={handleChange}
              />
            </div>

            <div className="flex  ">
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                className="mt-5 self-center w-[90%]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5  ">
            <span> Don t Have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 text-[17px] w-[90%]" color="failure">
              please fill out all the fields
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
export default SignIn;
