import { BsFacebook } from "react-icons/bs";
function page() {
  return (
    <div>
      <div className="h-screen overflow-auto bg-white w-fit p-5 -mt-5">
        Get insights about <br /> your business on social media <br />
        <button className="bg-blue-800 text-white p-3 rounded-md my-2">
          <BsFacebook className="inline" size={20} /> Connect your Facebook
        </button>
      </div>
    </div>
  );
}

export default page;
