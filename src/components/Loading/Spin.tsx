interface Spin {
  isLoading: boolean;
  bgColor?: string;
}

export default function Spin({ isLoading, bgColor }: Spin) {
  return (
    <>
      {isLoading && (
        <div
          className={
            `flex w-full h-full items-center justify-center ` + bgColor
          }
        >
          <div className="inline-block w-7 h-7 border-4 border-white/30 border-t-black rounded-full animate-spin duration-200"></div>
        </div>
      )}
    </>
  );
}
