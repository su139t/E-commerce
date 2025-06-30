import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to MyStore
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Find your style. Shop the latest trends now.
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {[
            {
              name: "Jewelry",
              image:
                "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
            },
            {
              name: "Watches",
              image:
                "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
            },
            {
              name: "Footwear",
              image:
                "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
            },
            {
              name: "Accessories",
              image:
                "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
            },
            {
              name: "Men's Clothing",
              image:
                "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
            },
            {
              name: "Hand Wear",
              image:
                "https://images.pexels.com/photos/5859569/pexels-photo-5859569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer hover:bg-indigo-50"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="mx-auto rounded-full mb-3 h-[80px] w-[80px] object-cover"
              />
              <h3 className="text-sm font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            {
              title: "Elegant Wrist Watch",
              price: "2999",
              image:
                "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
            },
            {
              title: "Leather Footwear",
              price: "1999",
              image:
                "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
            },
            {
              title: "Gold Jewelry Set",
              price: "6999",
              image:
                "https://images.pexels.com/photos/1191533/pexels-photo-1191533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
            },
            {
              title: "Denim Jacket",
              price: "2499",
              image:
                "https://imgs.search.brave.com/T04VYsCIXHmztaBoEYZyy3ihE2kwOtD1N3L2lLXwxG0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/bWlsZXktd29tYW4t/d2l0aC1kZW5pbS1q/YWNrZXRfMjMtMjE0/ODU3NDg1Ni5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQw",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-xl h-48 w-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-indigo-600 font-bold mb-2">₹{item.price}</p>
              <Link
                to="/products"
                className="text-sm text-indigo-500 hover:underline"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="mb-6">
          Get updates on new arrivals, discounts, and offers.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-full text-gray-700"
          />
          <button
            type="submit"
            className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
