import getDoctors from "./getDoctors";

export const featuredArticles = () => {
  const doctors = getDoctors();
  return [
    {
        id: 1,
        title: "Understanding Heart Health: A Comprehensive Guide",
        excerpt: "Learn about maintaining a healthy heart and preventing cardiovascular diseases with expert insights from our cardiology team.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3",
        category: "General Health",
        author: {
            name: doctors[0].name,
            role: doctors[0].role,
            image: doctors[0].image
        },
        date: "March 15, 2024",
        readTime: "8 min read"
    },
    {
        id: 2,
        title: "The Impact of Mental Health on Physical Well-being",
        excerpt: "Exploring the crucial connection between mental and physical health, and strategies for maintaining overall wellness.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
        category: "Mental Health",
        author: {
            name: doctors[1].name,
            role: doctors[1].role,
            image: doctors[1].image
        },
        date: "March 14, 2024",
        readTime: "6 min read"
    }
]
};

export const articles = () => {
  const doctors = getDoctors();
  [
    {
      id: 3,
      title: "Breakthrough in Medical Research: New Treatment Options",
      excerpt: "Latest developments in medical research that could revolutionize treatment approaches for various conditions.",
      image: "/images/article1.jpg",
      category: "Medical Research",
      author: {
        name: doctors[0].name,
        role: doctors[0].role,
        image: doctors[0].image
      },
      createdAt: "2024-03-13",
      updatedAt: "2024-03-13",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Patient Success Stories: Journey to Recovery",
      excerpt: "Inspiring stories of patients who overcame health challenges with the support of our medical team.",
      image: "/images/article2.jpg",
      category: "Patient Stories",
      author: {
        name: doctors[1].name,
        role: doctors[1].role,
        image: doctors[1].image
      },
      createdAt: "2025-03-12",
      updatedAt: "2025-03-12",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Innovative Approaches to Medical Education",
      excerpt: "How modern technology is transforming medical education and training for healthcare professionals.",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3",
      category: "Medical Research",
      author: {
        name: doctors[1].name,
        role: doctors[1].role,
        image: doctors[1].image
      },
      createdAt: "2025-03-11",
      updatedAt: "2025-03-11",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health checkups are essential for maintaining overall health and catching potential issues early.",
      image: "/images/article1.jpg",
      category: "General Health",
      author: {
        name: doctors[0].name,
        role: doctors[0].role,
        image: doctors[0].image
      },
      createdAt: "2025-03-10",
      updatedAt: "2025-03-10",
      readTime: "12 min read"
    },
    {
      id: 7,
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health checkups are essential for maintaining overall health and catching potential issues early.",
      image: "/images/article1.jpg",
      category: "General Health",
      author: {
        name: doctors[0].name,
        role: doctors[0].role,
        image: doctors[0].image
      },
      createdAt: "2024-03-09",
      updatedAt: "2024-03-09",
      readTime: "12 min read"
    },
    {
      id: 8,
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health checkups are essential for maintaining overall health and catching potential issues early.",
      image: "/images/article1.jpg",
      category: "General Health",
      author: {
        name: doctors[0].name,
        role: doctors[0].role,
        image: doctors[0].image
      },
      createdAt: "2024-03-08",
      updatedAt: "2024-03-08",
      readTime: "12 min read"
    }
        
  ]
};