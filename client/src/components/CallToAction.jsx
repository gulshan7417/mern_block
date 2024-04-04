import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 gap-5 justify-center flex flex-col ">
        <h2 className="text-2xl ">Want to learn more about JavaScript</h2>
        <p className="text-gray-500 mx-3">
          CheckOut these resouces with 100 JavaScript project
        </p>
        <Button gradientDuoTone="purpleToPink">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Project
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  );
};
export default CallToAction;
