export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export function getUserDetails(name) {
    return JSON.parse(localStorage.getItem(name));
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Predefined list of random bios
const bios = [
    "Love traveling and exploring new places! #TravelAddict 🌍",
    "Tech enthusiast, coffee lover, and bookworm. #TechLife 💻☕📚",
    "Living life one step at a time. #Mindfulness ✨",
    "Coding my way through the world. #DeveloperLife 👨‍💻",
    "Dream big, work hard, stay humble. #Motivation 🚀",
    "Nature lover and adventure seeker. #NatureLover 🌱🌄",
    "Foodie who loves trying out new cuisines! #FoodLover 🍕",
    "Fitness enthusiast and health advocate. #StayFit 💪🥗",
    "Always learning, always growing. #LifelongLearner 📖",
    "Passionate about art, music, and design. #CreativeSoul 🎨🎵",
  ];
  
  // Function to get a random bio
  function getRandomBio() {
    return bios[Math.floor(Math.random() * bios.length)];
  }
  
  // Function to generate random stats for a single post
  function generateRandomPostStats(post) {
    return {
      ...post, // Keep existing properties of the post
      likes: generateRandomNumber(0, 100),
      retweets: generateRandomNumber(0, 50),
      replies: generateRandomNumber(0, 40),
      bio: getRandomBio(), // Assign a random bio
    };
  }
  
  // Function to enhance posts array with random stats and bios
  export function enhancePosts(posts) {
    return posts.map((post) => generateRandomPostStats(post));
  }
  

  