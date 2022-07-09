import bcrypt from "bcryptjs"; //BE CAREFULL, bcryptjs package is different from bcrypt package. bcrypt throw error in this case

const data = {
  users: [
    {
      name: "Joan",
      email: "joankouloumba90@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Osiris",
      email: "kosjoan@yahoo.fr",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",//assign automatically by mongodb
      name: "Wax Slim Shirt",
      slug: "wax-slim-shirt",
      category: "Shirts",
      image: "/images/p1.png", // 679px x 829px
      price: 120,
      countInStock: 10,
      brand: "Wax",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "2",
      name: "Afriks Fit Shirt",
      slug: "afriks-fit-shirt",
      category: "Shirts",
      image: "/images/p2.png",
      price: 250,
      countInStock: 0,
      brand: "Afriks",
      rating: 4.0,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "3",
      name: "Wax Slim Pant",
      slug: "wax-slim-pant",
      category: "Pants",
      image: "/images/p3.png",
      price: 25,
      countInStock: 15,
      brand: "Wax",
      rating: 4.5,
      numReviews: 14,
      description: "high quality shirt",
    },
    {
      // _id: "4",
      name: "Afriks Fit Pant",
      slug: "afriks-fit-pant",
      category: "Pants",
      image: "/images/p4.png",
      price: 65,
      countInStock: 5,
      brand: "Afriks",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
  ],
};

export default data;
