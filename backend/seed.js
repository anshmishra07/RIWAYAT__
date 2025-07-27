const mongoose = require('mongoose');
require('dotenv').config();
const RecentEvent = require('./models/RecentEvent');
const FeaturedStory = require('./models/FeaturedStory');
const Destination = require('./models/Destination');

const dummyEvents = [
  {
    title: 'Jaipur Literature Festival 2024',
    description: "World's largest free literary festival, bringing together writers, thinkers, and book lovers.",
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    location: 'Jaipur, Rajasthan',
    date: new Date('2024-02-01'),
    link: 'https://jaipurliteraturefestival.org/'
  },
  {
    title: 'Kala Ghoda Arts Festival',
    description: 'A vibrant celebration of art, music, dance, and food in Mumbai\'s iconic Kala Ghoda district.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai, Maharashtra',
    date: new Date('2024-02-03'),
    link: 'https://kalaghodaassociation.com/'
  },
  {
    title: 'Rajasthan International Folk Festival',
    description: 'Experience the magic of folk music and dance at Mehrangarh Fort, Jodhpur.',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    location: 'Jodhpur, Rajasthan',
    date: new Date('2024-10-25'),
    link: 'https://jodhpurfolkfestival.org/'
  },
  {
    title: 'Hornbill Festival',
    description: 'A week-long festival celebrating the culture of Nagaland with music, dance, and food.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    location: 'Kisama, Nagaland',
    date: new Date('2024-12-01'),
    link: 'https://hornbillfestival.com/'
  },
  {
    title: 'Sunburn Festival',
    description: 'Asia’s biggest electronic music festival held annually in Goa.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    location: 'Goa',
    date: new Date('2024-12-27'),
    link: 'https://sunburn.in/'
  },
  {
    title: 'Pushkar Camel Fair',
    description: 'A vibrant festival featuring camel trading, cultural performances, and competitions.',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
    location: 'Pushkar, Rajasthan',
    date: new Date('2024-11-20'),
    link: 'https://www.pushkarcamelfair.com/'
  }
];

const dummyStories = [
  {
    title: "The Last Weavers of Varanasi",
    description: "Discover the ancient art of Banarasi silk weaving and the artisans keeping this tradition alive.",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db71102?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "art",
    region: "Uttar Pradesh",
    author: "Priya Sharma",
    readTime: "5 min read",
    link: 'https://www.nationalgeographic.com/history/article/banarasi-silk-weaving-india'
  },
  {
    title: "Kathakali: Dance of the Gods",
    description: "Exploring the mystical world of Kerala's classical dance form and its divine stories.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "dance",
    region: "Kerala",
    author: "Rajesh Menon",
    readTime: "7 min read",
    link: 'https://www.keralatourism.org/artforms/kathakali/2'
  },
  {
    title: "The Spice Routes of Malabar",
    description: "Journey through the ancient spice trade routes and traditional cooking methods.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "food",
    region: "Kerala",
    author: "Anita Desai",
    readTime: "6 min read",
    link: 'https://www.britannica.com/place/Malabar-Coast'
  },
  {
    title: "Warli Art: Tribal Tales on Walls",
    description: "Explore the unique tribal art form of Maharashtra, its symbolism, and its global recognition.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    category: "art",
    region: "Maharashtra",
    author: "Sunita Patil",
    readTime: "4 min read",
    link: 'https://www.culturalindia.net/indian-art/paintings/warli-paintings.html'
  },
  {
    title: "Bihu: The Festival of Assam",
    description: "A look into Assam's most celebrated festival, its dances, and its cultural significance.",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
    category: "festival",
    region: "Assam",
    author: "Rohit Das",
    readTime: "5 min read",
    link: 'https://www.assaminfo.com/festivals/1/bihu.htm'
  }
];

const dummyDestinations = [
  {
    name: "Khajuraho Temples",
    englishName: "Khajuraho Temples",
    description: "Ancient temples showcasing exquisite sculptures and architectural brilliance",
    image: "https://images.unsplash.com/photo-1548013146-72492268e070?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Madhya Pradesh",
    bestTime: "October to March",
    heritage: "UNESCO World Heritage",
    entryFee: "₹40 (Indian), ₹600 (Foreign)",
    link: 'https://www.khazurahotemples.com/'
  },
  {
    name: "Hampi Ruins",
    englishName: "Hampi Ruins",
    description: "UNESCO World Heritage site with stunning ruins of the Vijayanagara Empire",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Karnataka",
    bestTime: "November to February",
    heritage: "UNESCO World Heritage",
    entryFee: "₹40 (Indian), ₹600 (Foreign)",
    link: 'https://hampi.in/'
  },
  {
    name: "Konark Sun Temple",
    englishName: "Konark Sun Temple",
    description: "Magnificent 13th-century temple dedicated to the Sun God",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db71102?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    region: "Odisha",
    bestTime: "October to March",
    heritage: "UNESCO World Heritage",
    entryFee: "₹40 (Indian), ₹600 (Foreign)",
    link: 'https://konark.nic.in/'
  },
  {
    name: "Ajanta Caves",
    englishName: "Ajanta Caves",
    description: "Rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    region: "Maharashtra",
    bestTime: "November to March",
    heritage: "UNESCO World Heritage",
    entryFee: "₹40 (Indian), ₹600 (Foreign)",
    link: 'https://ajantacaves.com/'
  },
  {
    name: "Golden Temple",
    englishName: "Harmandir Sahib",
    description: "The holiest Gurdwara and the most important pilgrimage site of Sikhism.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    region: "Punjab",
    bestTime: "October to March",
    heritage: "Religious Site",
    entryFee: "Free",
    link: 'https://www.goldentempleamritsar.org/'
  }
];

async function seedEvents() {
  await mongoose.connect(process.env.MONGO_URI);
  await RecentEvent.deleteMany({});
  await RecentEvent.insertMany(dummyEvents);
  await FeaturedStory.deleteMany({});
  await FeaturedStory.insertMany(dummyStories);
  await Destination.deleteMany({});
  await Destination.insertMany(dummyDestinations);
  console.log('Dummy recent events, featured stories, and destinations inserted!');
  mongoose.disconnect();
}

seedEvents();