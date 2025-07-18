/** ************************************************************** */
/* Loading Component */
function Loading() {
  /** ************************************************************** */
  /* Render */
  return (
    <div className="absolute z-40 flex w-full h-screen items-center justify-center bg-gray-100/50">
      <img src="/images/loading.svg" alt="Loading ..." className="h-15" />
    </div>
  );
}

export default Loading;
