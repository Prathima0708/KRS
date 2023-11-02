import { images } from "../constants";

export const contacts = [
    {
        id: '1',
        userName: 'John Doe',
        userImg: images.avatar,
        isOnline: false,
        lastSeen: '3 Days ago',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '2',
        userName: 'Marry Lio',
        userImg: images.avatar2,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'Good morning...',
        messageInQueue: 0,
        sentDate: '12/7',
    },
    {
        id: '3',
        userName: 'Lucia Mu',
        userImg: images.avatar3,
        isOnline: false,
        lastSeen: '2 weeks ago',
        lastMessage: "What's up...",
        messageInQueue: 0,
        sentDate: '12/7',
    },
    {
        id: '4',
        userName: 'Raki Lili',
        userImg: images.avatar4,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'Send me the link',
        messageInQueue: 0,
        sentDate: 'Today',
    },
    {
        id: '5',
        userName: 'Raki Devine',
        userImg: images.avatar5,
        isOnline: false,
        lastSeen: '5 days ago',
        lastMessage: 'We are doing...',
        messageInQueue: 0,
        sentDate: '23/9',
    },
    {
        id: '6',
        userName: 'Aris Yup',
        userImg: images.avatar9,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: 'Today',
    },
    {
        id: '7',
        userName: 'Aris Yup',
        userImg: images.avatar6,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '8',
        userName: 'Billy Di',
        userImg: images.avatar7,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '9',
        userName: 'Aris Biu',
        userImg: images.avatar8,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
];

export const furnitureCategories = [
    {
      id: 1,
      name: "All Furniture",
      image: images.livingroom,
      description: "Explore our entire furniture collection",
      startingPrice: 99.99
    },
    {
      id: 2,
      name: "Sofas",
      image: images.sofa,
      description: "Find comfortable and stylish sofas for your living room",
      startingPrice: 299.99
    },
    {
      id: 3,
      name: "Beds",
      image: images.bed,
      description: "Discover cozy and elegant beds for a restful night's sleep",
      startingPrice: 399.99
    },
    {
      id: 4,
      name: "Tables",
      image: images.table,
      description: "Browse our collection of modern and functional tables",
      startingPrice: 149.99
    },
    {
      id: 5,
      name: "Chairs",
      image: images.chair,
      description:  "Find ergonomic and stylish chairs for your home or office",
      startingPrice: 89.99
    },
  ];
  
  
  export const orders = [
    {
      id: 1,
      name: 'Elegant Sofa Set',
      type: 'Furniture',
      price: 299.99,
      numberOfItems: 1,
      receipt: "#20231001",
      image: images.product1
    },
    {
      id: 2,
      name: 'Luxurious Bed Frame',
      type: 'Furniture',
      price: 499.99,
      numberOfItems: 2,
      receipt: "#20231002",
      image: images.product2
    },
    {
      id: 3,
      name: 'Stylish Dining Table',
      type: 'Furniture',
      price: 199.99,
      numberOfItems: 1,
      receipt: "#20231003",
      image: images.product3
    },
  ];
  
  export const orderHistory = [
    {
      id: 1,
      status: "Completed",
      date: "12 Oct, 10:30",
      name: 'Elegant Sofa Set',
      type: 'Furniture',
      price: 299.99,
      numberOfItems: 1,
      receipt: "#20231001",
      image: images.product1
    },
    {
      id: 2,
      status: "Completed",
      date: "13 Oct, 14:15",
      name: 'Luxurious Bed Frame',
      type: 'Furniture',
      price: 499.99,
      numberOfItems: 2,
      receipt: "#20231002",
      image: images.product2
    },
    {
      id: 3,
      status: "Canceled",
      date: "14 Oct, 11:45",
      name: 'Stylish Dining Table',
      type: 'Furniture',
      price: 199.99,
      numberOfItems: 1,
      receipt: "#20231003",
      image: images.product3
    },
  ];
  
  
  export const orderList = [
    {
        latitude: 48.8566,
        longitude: 2.3522,
        name: 'Order 1',
        description: 'Order description 2',
    },
    {
        latitude: 43.2965,
        longitude: 5.3698,
        name: 'Order 2',
        description: 'Order description 2',
    },
    {
        latitude: 45.764,
        longitude: 4.8357,
        name: 'Order 3',
        description: 'Order description 3',
    },
    {
        latitude: 43.6045,
        longitude: 1.4442,
        name: 'Order 4',
        description: 'Order description 4',
    },
    {
        latitude: 43.7102,
        longitude: 7.2661,
        name: 'Order 5',
        description: 'Order description 5',
    },
  ];
  
  
  export const TransactionHistoryData = [
    {
        id: "1",
        image: images.product1,
        name: "Elegant Sofa Set",
        date: "Oct 14, 2023 | 8:00 AM", 
        type: "Purchase",
        amount: 299.99
    },
    {
        id: "2",
        image: images.product2,
        name: "Luxurious Bed Frame",
        date: "Oct 14, 2023 | 9:00 AM", 
        type: "Purchase",
        amount: 499.99
    },
    {
        id: "3",
        image: images.product3,
        name: "Stylish Dining Table",
        date: "Oct 13, 2023 | 10:00 AM", 
        type: "Purchase",
        amount: 199.99
    },
    {
        id: "4",
        image: images.product4,
        name: "Artistic Home Decor Accent",
        date: "Oct 13, 2023 | 11:00 AM", 
        type: "Purchase",
        amount: 99.99
    },
    {
        id: "5",
        image: images.product5,
        name: "Comfortable Office Chair",
        date: "Oct 13, 2023 | 1:00 PM", 
        type: "Purchase",
        amount: 149.99
    },
    {
        id: "6",
        image: images.product6,
        name: "Functional Bookcase",
        date: "Oct 12, 2023 | 3:00 PM", 
        type: "Purchase",
        amount: 129.99
    },
    {
        id: "7",
        image: images.product7,
        name: "Cozy Armchair",
        date: "Oct 12, 2023 | 5:00 PM", 
        type: "Purchase",
        amount: 199.99
    },
  ];
  
  export const notifications = [
      { 
          id: 1,
          image: images.product1,
          avatar: images.avatar,
          name: 'Furniture Store',
          message: 'New collection of elegant sofas now available!',
          time: '2023-10-06T03:55:02.922Z'
      },
      { 
          id: 2,
          image: images.product2,
          avatar: images.avatar2,
          name: 'Home Decor Center',
          message: 'Limited-time offer: 20% off on all home decor items!',
          time: '2023-10-02T03:55:02.922Z'
      },
      { 
          id: 3,
          image: images.product3,
          avatar: images.avatar3,
          name: 'Furniture Sale',
          message: 'Big sale event this weekend. Don\'t miss out!',
          time: '2023-09-16T03:55:02.922Z'
      },
      { 
          id: 4,
          image: images.product4,
          avatar: images.avatar4,
          name: 'Furniture Specials',
          message: 'Special discount on all furniture sets today!',
          time: '2023-09-16T03:55:02.922Z'
      },
      { 
          id: 5,
          image: images.product5,
          avatar: images.avatar5,
          name: 'Home Furnishings',
          message: 'New arrivals in the chairs and tables section!',
          time: '2023-08-16T03:55:02.922Z'
      },
      { 
          id: 6,
          image: images.product6,
          avatar: images.avatar6,
          name: 'Interior Designs',
          message: 'Get a free consultation for your home makeover!',
          time: '2023-08-16T03:55:02.922Z'
      },
      { 
          id: 7,
          image: images.product7,
          avatar: images.avatar7,
          name: 'Furniture Styles',
          message: 'Discover the latest trends in modern furniture design.',
          time: '2023-08-16T03:55:02.922Z'
      }
  ];
  