export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border-4 border-gray-300"></div>
        <div className="absolute h-20 w-20 rounded-full border-4 border-blue-600 border-t-transparent animate-spin shadow-[0_0_12px_#2563eb]"></div>
      </div>
    </div>
  );
}
