/** ************************************************************** */
/* ErrorBar Component */
function ErrorBar({ message = "An error occurred" }: { message?: string }) {
  /** ************************************************************** */
  /* Render */
  return (
    <div className="absolute animate-[fadeOut_1s_ease-out_5s_forwards] z-40 flex w-full h-screen bg-gray-100/40">
      <div className="absolute  w-full h-8 flex flex-wrap justify-center content-center z-50 mt-25 text-white font-semibold bg-red-700">
        {message}
      </div>
    </div>
  );
}

export default ErrorBar;
