export const registerControls = [
  {
    name: "username",
    type: "text",
    componetType: "input",
    label: "Username",
    placeholder: "Enter your username",
    required: true,
    validation: {
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email address",
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
    validation: {
      minLength: 6,
    },
  },
];

export const loginControls = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email address",
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
    validation: {
      minLength: 6,
    },
  },
];

export const productFormElements = [
  {
    name: "name",
    componentType: "text",
    label: "Product Name",
    placeholder: "Enter product name",
    required: true,
    validation: {
      minLength: 3,
      maxLength: 100,
    },
  },
  {
    name: "brand",
    componentType: "select",
    label: "Brand",
    placeholder: "Select brand",
    required: true,
    options: [
      { value: "select", label: "Select a brand" },
      { value: "nike", label: "Nike" },
      { value: "adidas", label: "Adidas" },
      { value: "zara", label: "Zara" },
      { value: "hm", label: "H&M" },
      { value: "uniqlo", label: "Uniqlo" },
      { value: "custom", label: "Other/Custom" },
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "description",
    componentType: "textarea",
    label: "Description",
    placeholder: "Enter product description",
    required: true,
    validation: {
      minLength: 10,
      maxLength: 500,
    },
  },
  {
    name: "price",
    componentType: "number",
    label: "Price ($)",
    placeholder: "0.00",
    required: true,
    step: 0.01,
    validation: {
      min: 0.01,
    },
  },
  {
    name: "salePrice",
    componentType: "number",
    label: "Sale Price ($)",
    placeholder: "0.00",
    required: false,
    step: 0.01,
  },
  {
    name: "imageUrl",
    componentType: "url",
    label: "Images",
    placeholder: "https://example.com/product.jpg",
    required: false,
    validation: {
      pattern: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i,
    },
  },
  {
    name: "category",
    componentType: "select",
    label: "Category",
    placeholder: "Select category",
    required: true,
    options: [
      { value: "select", label: "Select a category" },
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "accessoiries", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
    ],
    validation: {
      required: true,
    },
  },
  {
    name: "stock",
    componentType: "number",
    label: "Stock Quantity",
    placeholder: "0",
    required: true,
    validation: {
      min: 0,
    },
  },
  {
    name: "isFeatured",
    componentType: "checkbox",
    label: "Featured Product",
    description: "Highlight this product on the home page",
    default: false,
  },
  {
    name: "isActive",
    componentType: "checkbox",
    label: "Active Product",
    description: "Whether this product is currently available",
    default: true,
  },
  {
    name: "tags",
    componentType: "text",
    label: "Tags",
    placeholder: "e.g. summer, new, hot (optional)",
    description: "Comma-separated tags (optional)",
    required: false,
    parse: (value) => value.split(",").map((tag) => tag.trim()),
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/products",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/products",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/products",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/products",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/products",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};
export const filterOptions = {
  Category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  Brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "zara", label: "Zara" },
    { id: "hm", label: "H&M" },
    { id: "uniqlo", label: "Uniqlo" },
    { id: "custom", label: "Other/Custom" },
  ],
};

export const sortOptions =[
    { id: "price-lowToHigh", label: "Price: low to high" },
    { id: "price-highToLow", label: "Price: high to low" },
    { id: "name-aToz", label: "Name: A to Z" },
    { id: "name-zToa", label: "Name: Z to A" },
]

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

