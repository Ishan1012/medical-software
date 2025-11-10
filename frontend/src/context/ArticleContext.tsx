import { Article, Doctor } from "@/types/type";

export const getFeaturedArticles = async (doctors: Doctor[]): Promise<Article[]> => {
  return [
    {
      id: "1",
      title: "Understanding Heart Health: A Comprehensive Guide",
      excerpt: "Learn about maintaining a healthy heart and preventing cardiovascular diseases with expert insights from our cardiology team.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3",
      category: "General Health",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty,
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'
      },
      readTime: "8 min read",
      createdAt: "March 15, 2024",
    },
    {
      id: "2",
      title: "The Impact of Mental Health on Physical Well-being",
      excerpt: "Exploring the crucial connection between mental and physical health, and strategies for maintaining overall wellness.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
      category: "Mental Health",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty,
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'
      },
      readTime: "6 min read",
      createdAt: "March 14, 2024",
    }
  ]
};

export const getArticles = async (doctors: Doctor[]): Promise<Article[]> => {
  return [
    {
      id: "3", // Changed to string
      title: "Breakthrough in Medical Research: New Treatment Options",
      excerpt: "Latest developments in medical research that could revolutionize treatment approaches for various conditions.",
      imageUrl: "/images/article1.jpg", // Renamed from 'image'
      category: "Medical Research",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty, // Renamed from 'speciality'
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'   // Renamed from 'image'
      },
      createdAt: "2024-03-13",
      readTime: "10 min read"
    },
    {
      id: "4", // Changed to string
      title: "Patient Success Stories: Journey to Recovery",
      excerpt: "Inspiring stories of patients who overcame health challenges with the support of our medical team.",
      imageUrl: "/images/article2.jpg", // Renamed from 'image'
      category: "Patient Stories",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty, // Renamed from 'speciality'
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'  // Renamed from 'image'
      },
      createdAt: "2025-03-12",
      readTime: "7 min read"
    },
    {
      id: "5", // Changed to string
      title: "Innovative Approaches to Medical Education",
      excerpt: "How modern technology is transforming medical education and training for healthcare professionals.",
      imageUrl: "/images/article3.png", // Renamed from 'image'
      category: "Medical Research",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty, // Renamed from 'speciality'
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'   // Renamed from 'image'
      },
      createdAt: "2025-03-11",
      readTime: "9 min read"
    },
    {
      id: "6", // Changed to string
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health checkups are essential for maintaining overall health and catching potential issues early.",
      imageUrl: "/images/article4.png", // Renamed from 'image'
      category: "General Health",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty, // Renamed from 'speciality'
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'   // Renamed from 'image'
      },
      createdAt: "2025-03-10",
      readTime: "12 min read"
    },
    {
      id: "7", // Changed to string
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health checkups are essential for maintaining overall health and catching potential issues early.",
      imageUrl: "/images/article5.png", // Renamed from 'image'
      category: "General Health",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty, // Renamed from 'speciality'
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'   // Renamed from 'image'
      },
      createdAt: "2024-03-09",
      readTime: "12 min read"
    },
    {
      id: "8", // Changed to string
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health checkups are essential for maintaining overall health and catching potential issues early.",
      imageUrl: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3", // Renamed from 'image'
      category: "General Health",
      author: {
        name: doctors[0].name,
        speciality: doctors[0].specialty, // Renamed from 'speciality'
        profileUrl: doctors[0].profileUrl || '/images/male-default-default.png'   // Renamed from 'image'
      },
      createdAt: "2024-03-08",
      readTime: "12 min read"
    }
  ];
};