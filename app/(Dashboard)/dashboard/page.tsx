import ServicesList from "./_components/ServicesList";

export const metadata = {
  title: "Dashboard",
};
const page = async () => {
  return (
    <main className="flex flex-col flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen ">
      <div className="flex flex-col sm:flex-row w-full px-4 min-h-screen gap-4 ">
        <div className="flex flex-col flex-1 w-full gap-3">
          <div className="py-1 my-3 border-b ">
            <h1 className="text-2xl ">Services</h1>
          </div>
          <ServicesList />
        </div>
      </div>
    </main>
  );
};

export default page;
