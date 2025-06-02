export default function Home() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <div>
        <div className="flex items-center gap-5 mb-3">
          <label htmlFor="name-filter">Username</label>
          <input
            id="name-filter"
            type="text"
            onChange={(e) => console.log(e.target.value)}
            className="w-full mb-2 border-b focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-5 mb-10">
          <label htmlFor="name-filter">Password</label>
          <input
            id="name-filter"
            type="text"
            onChange={(e) => console.log(e.target.value)}
            className="w-full mb-2 border-b focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-around gap-5 mb-3">
          <button className="btn-primary">Login</button>
          <button className="btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
}
