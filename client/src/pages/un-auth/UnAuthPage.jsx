

function UnAuthPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-lg mb-8">You do not have permission to access this page.</p>
      <a href="/shop/home" className="text-blue-500 hover:underline">Go back to home</a>
    </div>
  );
}

export default UnAuthPage;