export default function ColorPicker() {
  return (
    <div>
      <div className="flex items-center gap-1 ">
        <div className="bg-pink-500 rounded-sm shadow-lg h-7 w-7 hover:bg-pink-400 transition-all cursor-pointer "></div>
        <div className="bg-blue-500 rounded-sm  h-7 w-7 hover:bg-blue-400 transition-all cursor-pointer "></div>
        <div className="bg-slate-800 rounded-sm h-7 w-7 hover:bg-slate-600 transition-all cursor-pointer "></div>
      </div>
    </div>
  );
}
