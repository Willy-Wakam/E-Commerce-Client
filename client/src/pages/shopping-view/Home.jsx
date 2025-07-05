function ShoppingHome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Shopping App</h1>
      <p className="text-lg mb-8">
        Explore our products and enjoy your shopping experience!
      </p>
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Shopping
      </button>
    </div>
  );
}

export default ShoppingHome;
