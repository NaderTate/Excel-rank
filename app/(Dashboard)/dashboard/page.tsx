import Main from "./Main";

export const metadata = {
  title: "Dashboard",
};
const page = async () => {
  return (
    <main className="flex flex-col flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen ">
      <Main />
    </main>
  );
};

export default page;
