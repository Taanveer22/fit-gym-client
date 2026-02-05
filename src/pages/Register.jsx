import { useContext } from "react";
import { AuthContext } from "../provider/AuthContextProvider";

const Register = () => {
  const { registerUser, updateUserProfile } = useContext(AuthContext);

  const handleRegisterForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(name, photo, email, password);
    registerUser(email, password)
      .then((result) => {
        console.log(result);
        updateUserProfile(name, photo)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegisterForm} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
            />
            <label className="label">Photo</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo"
            />
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
