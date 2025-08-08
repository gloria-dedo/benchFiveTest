export default function CustomSkeleton() {
  return (
    <section className="animate-pulse w-full space-y-6 ">
      <div className="h-12 flex items-center justify-between w-full bg-gray-200 border border-gray-300  px-4">
        <p className="w-[70px] h-8 rounded-md bg-white border border-gray-200"></p>
        <p className="w-[600px] h-8 rounded-full bg-white border border-gray-200"></p>
        <p className="w-[200px] h-8 rounded-full bg-white border border-gray-200"></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) =><div className=" " key={n}>
        <div className="bg-white w-full lg:w-[300px]  space-y-3  rounded-md border border-light-border  px-8 py-4">
          <p className="bg-gray-200 w-28 h-4 animate-pulse"></p>

          <div className="w-full grid grid-cols-1 gap-2 rounded-md ">
            <div className=" h-[300px] flex items-center gap-2  bg-gray-100 rounded-sm px-2 py-2"></div>

            <div className=" flex flex-col gap-1">
              <p className="w-18 h-2 bg-gray-100"></p>
              <p className="w-38 h-2 bg-gray-100"></p>
              <p className="w-38 h-2 bg-gray-100"></p>
              <p className="w-45 h-2 bg-gray-100"></p>
            </div>
          </div>
        </div>
      </div>)}
      </div>
    </section>
  );
}
