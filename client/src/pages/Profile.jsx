import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { currentUser,loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(currentUser._id);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Added parentheses to call preventDefault

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Corrected the header field name
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Removed formData argument
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message)); // Corrected the property name to `message`
    }
  };


  return (
    <div className="p-3 max-w-lg  mx-auto mt-12">
      <h1 className="text-3xl p-5   font-semibold text-center ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className="">
          {fileUploadError ? (
            <span className="text-red-700">Error Image upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">Uploading {filePerc}%</span>
          ) : (
            <span className="text-slate-700">Upload complete</span>
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg w-[90%] self-center"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg w-[90%] self-center"
          id="email"
        />
        <input
          type="password"
          defaultValue={currentUser.password}
          onChange={handleChange}
          placeholder="password"
          className="border p-3 rounded-lg w-[90%] self-center"
          id="password"
        />

        <button disabled={loading} className="bg-slate-700 w-[90%] self-center text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {
            loading? 'loading...':'update'
          }
        </button>
      </form>
      <div className="flex justify-between mt-5 w-[90%]  font-bold">
        <span className="text-red-700">Delete Account</span>
        <span className="text-red-700">Sign out</span>
      </div>
      <p className='text-red-7000 mt-5'>
        
      </p>
    </div>
  );
};
export default Profile;
 