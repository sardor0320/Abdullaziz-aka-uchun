import React, { useEffect, useState } from "react";
import Table from "./components/table";
import { toast } from "sonner";

function App() {
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [product, setProduct] = useState({});

  const toggleModal = () => setAddModal(!addModal);

  async function getProducts() {
    try {
      const response = await fetch("http://localhost:3000/user");
      const products = await response.json();
      console.log(products);
      setData(products);
    } catch (error) {
      console.error("Ma'lumotlarni olishda xato:", error);
    }
  }

  const addProduct = async (e) => {
    e.preventDefault();

    if (!product.title || !product.descreption) {
      toast.warning("Please fill in all fields");
      return;
    }
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log(data);

    toast.success("Product added successfully");
    setProduct({});
    toggleModal();
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="px-[25%] mx-auto min-h-screen py-4 bg-blue-950">
      <button
        onClick={toggleModal}
        className="rounded px-5 py-2 bg-blue-500 text-white my-5"
      >
        Add
      </button>
      <Table data={data} />
      {addModal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          class="overflow-y-auto overflow-x-hidden flex bg-black/50 backdrop-blur-lg fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Add product
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <form class="space-y-4" action="#">
                  <div>
                    <label
                      for="title"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      onChange={(e) =>
                        setProduct({ ...product, title: e.target.value })
                      }
                      type="text"
                      name="title"
                      id="title"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="descreption"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your descreption
                    </label>
                    <input
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          descreption: e.target.value,
                        })
                      }
                      type="text"
                      name="descreption"
                      id="descreption"
                      placeholder="Lorem ipsum dolor sit."
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={addProduct}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                    <button
                      onClick={toggleModal}
                      class=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
