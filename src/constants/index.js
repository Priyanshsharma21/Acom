export const navigation = [
    { name: 'T-Shirt', href: '/category/tshirt' },
    { name: 'Shirt', href: '/category/shirt' },
    { name: 'Bottom', href: '/category/bottom' },
    { name: 'Anime', href: '/category/anime' },
    { name: 'Cap', href: '/category/cap' },
  ]
  

  export const filters = {
    price: [
      { value: 602, label: '₹500 - ₹600', checked: false },
      { value: 600, label: '₹600 - ₹700', checked: false },
      { value: 700, label: '₹700 - ₹800', checked: false },
      { value: 800, label: '₹800 - ₹900', checked: false },
      { value: 900, label: '₹900 - ₹100', checked: false },
      { value: 1000, label: '₹1000+', checked: false },
    ],
    color: [
      { value: 'white', label: 'White', checked: false },
      { value: 'pink', label: 'Pink', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
      { value: 'black', label: 'Black', checked: false },
      { value: 'red', label: 'Red', checked: false },
    ],
    size: [
      { value: 's', label: 'S', checked: true },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
      { value: 'xxl', label: '2XL', checked: false },
      { value: 'xxxl', label: '2XL', checked: false },
    ],
    category: [
      { value: 'tshirt', label: 'Brand new t-shirt', checked: false },
      { value: 'shirt', label: 'Classic Shirts', checked: false },
      { value: 'hoodie', label: 'Cool Hoodies', checked: false },
      { value: 'bottom', label: 'Comfy Bottoms', checked: false },
      { value: 'cap', label: 'Amazing Caps', checked: false },
      { value: 'dress', label: 'Women Dresses', checked: false },
      { value: 'track-pants', label: 'Sports Track Pants', checked: false },
    ],

    sorts: [
      { value: 'High to Low', label: 'High to Low', checked: false },
      { value: 'Low to High', label: 'Low to High', checked: false },
      { value: 'Newest', label: 'Newest First', checked: false },
    ],
  }


