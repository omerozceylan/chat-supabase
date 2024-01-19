interface Spin {
  isLoading: boolean;
}

export default function Spin({ isLoading }: Spin) {
  return (
    <>
      {isLoading && (
        <div className="flex w-full h-screen items-center justify-center bg-white">
          <div className="inline-block w-7 h-7 border-4 border-white/30 border-t-black rounded-full animate-spin duration-200"></div>
        </div>
      )}
    </>
  );
}
