export interface Community {
  id: number
  name: string
  description: string
  members: number
  category: string
  location: string
  image: string
  rating: number
  events: number
  posts: number
  isJoined?: boolean
}

export interface Event {
  id: number
  title: string
  community: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  description: string
  category: string
  isRegistered?: boolean
}

export interface Post {
  id: number
  author: string
  authorEmail: string
  avatar: string
  community: string
  content: string
  timestamp: string
  likes: number
  comments: number
  likedBy: string[]
}

export interface UserJoins {
  communities: number[]
  events: number[]
  opportunities: number[]
}

export interface VolunteerActivity {
  id: number
  userEmail: string
  title: string
  organization: string
  date: string
  hours: number
  category: string
  description: string
  status: "completed" | "ongoing" | "upcoming"
  impact: string
  location: string
}

export class SharedDataStore {
  private static KEYS = {
    POSTS: "charity_posts",
    USER_JOINS: "charity_user_joins",
    COMMUNITIES: "charity_communities",
    EVENTS: "charity_events",
    ACTIVITIES: "charity_activities",
  }

  static initializeSampleData(): void {
    if (!this.getPosts().length) {
      const samplePosts: Post[] = [
        {
          id: Date.now() - 10000,
          author: "Sarah Ahmed",
          authorEmail: "sarah@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          community: "Environmental Warriors UAE",
          content:
            "Just completed an amazing beach cleanup at Jumeirah Beach! Collected over 50kg of plastic waste with 20 volunteers. Every small action counts towards a cleaner UAE! 🌊♻️",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          likes: 24,
          comments: 5,
          likedBy: [],
        },
        {
          id: Date.now() - 20000,
          author: "Mohammed Al Mansoori",
          authorEmail: "mohammed@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
          community: "Dubai Cares Education",
          content:
            "Spent the afternoon reading to children at Al Barsha Library. Their enthusiasm for learning is truly inspiring! Looking forward to next week's session. 📚✨",
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          likes: 18,
          comments: 3,
          likedBy: [],
        },
        {
          id: Date.now() - 30000,
          author: "Fatima Hassan",
          authorEmail: "fatima@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
          community: "Emirates Red Crescent",
          content:
            "Helped distribute 200 food packages today at the Al Quoz Food Bank. The gratitude from families reminds me why this work matters. Thank you to all volunteers who showed up! 🤝❤️",
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          likes: 32,
          comments: 8,
          likedBy: [],
        },
        {
          id: Date.now() - 40000,
          author: "Ali Rahman",
          authorEmail: "ali@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
          community: "Animal Welfare UAE",
          content:
            "Volunteered at K9 Friends shelter today. Met the most adorable rescue puppies! If you're looking to adopt or volunteer, this place needs your support. 🐕🐾",
          timestamp: new Date(Date.now() - 345600000).toISOString(),
          likes: 41,
          comments: 12,
          likedBy: [],
        },
        {
          id: Date.now() - 50000,
          author: "Layla Abdullah",
          authorEmail: "layla@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
          community: "Sustainable Living Dubai",
          content:
            "Our community garden is thriving! Harvested fresh vegetables today and donated them to local families. Urban farming is the future of sustainability! 🌱🥬",
          timestamp: new Date(Date.now() - 432000000).toISOString(),
          likes: 27,
          comments: 6,
          likedBy: [],
        },
      ]
      localStorage.setItem(this.KEYS.POSTS, JSON.stringify(samplePosts))
    }

    if (!this.getActivities().length) {
      const sampleActivities: VolunteerActivity[] = [
        {
          id: 1,
          userEmail: "demo@example.com",
          title: "Beach Cleanup Drive",
          organization: "Emirates Environmental Group",
          date: "2024-02-15",
          hours: 4,
          category: "Environment",
          description: "Participated in cleaning Jumeirah Beach, collected 50kg of plastic waste",
          status: "completed",
          impact: "Cleaned 2km of coastline",
          location: "Jumeirah Beach, Dubai",
        },
        {
          id: 2,
          userEmail: "demo@example.com",
          title: "Food Distribution",
          organization: "Emirates Red Crescent",
          date: "2024-02-20",
          hours: 6,
          category: "Humanitarian",
          description: "Helped distribute food packages to 150 families during Ramadan",
          status: "completed",
          impact: "Served 150 families",
          location: "Al Quoz, Dubai",
        },
        {
          id: 3,
          userEmail: "demo@example.com",
          title: "Youth Mentorship",
          organization: "Dubai Cares",
          date: "2024-03-01",
          hours: 3,
          category: "Education",
          description: "Mentoring underprivileged students in mathematics and science",
          status: "ongoing",
          impact: "Supporting 12 students",
          location: "Dubai Knowledge Park",
        },
        {
          id: 4,
          userEmail: "demo@example.com",
          title: "Tree Planting Initiative",
          organization: "Emirates Environmental Group",
          date: "2024-03-25",
          hours: 5,
          category: "Environment",
          description: "Community tree planting event to increase green cover in Dubai",
          status: "upcoming",
          impact: "Target: 500 trees",
          location: "Al Barari, Dubai",
        },
        {
          id: 5,
          userEmail: "demo@example.com",
          title: "Senior Care Visit",
          organization: "Beit Al Khair Society",
          date: "2024-02-10",
          hours: 3,
          category: "Healthcare",
          description: "Spent time with elderly residents, organized activities and conversations",
          status: "completed",
          impact: "Brightened 30 seniors' day",
          location: "Al Barsha Care Home",
        },
        {
          id: 6,
          userEmail: "demo@example.com",
          title: "Animal Shelter Support",
          organization: "K9 Friends",
          date: "2024-02-28",
          hours: 4,
          category: "Animal Welfare",
          description: "Helped care for rescue animals, cleaned facilities, and socialized pets",
          status: "completed",
          impact: "Cared for 25 animals",
          location: "Dubai Animal Shelter",
        },
      ]
      localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(sampleActivities))
    }
  }

  static getPosts(): Post[] {
    const data = localStorage.getItem(this.KEYS.POSTS)
    return data ? JSON.parse(data) : []
  }

  static addPost(post: Omit<Post, "id" | "timestamp" | "likes" | "comments" | "likedBy">): Post {
    const posts = this.getPosts()
    const newPost: Post = {
      ...post,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      likedBy: [],
    }
    posts.unshift(newPost)
    localStorage.setItem(this.KEYS.POSTS, JSON.stringify(posts))
    return newPost
  }

  static toggleLike(postId: number, userEmail: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post) {
      const likedIndex = post.likedBy.indexOf(userEmail)
      if (likedIndex > -1) {
        post.likedBy.splice(likedIndex, 1)
        post.likes = Math.max(0, post.likes - 1)
      } else {
        post.likedBy.push(userEmail)
        post.likes += 1
      }
      localStorage.setItem(this.KEYS.POSTS, JSON.stringify(posts))
    }
  }

  static getUserJoins(userEmail: string): UserJoins {
    const data = localStorage.getItem(this.KEYS.USER_JOINS)
    const allJoins: Record<string, UserJoins> = data ? JSON.parse(data) : {}
    return allJoins[userEmail] || { communities: [], events: [], opportunities: [] }
  }

  static toggleJoinCommunity(userEmail: string, communityId: number): void {
    const data = localStorage.getItem(this.KEYS.USER_JOINS)
    const allJoins: Record<string, UserJoins> = data ? JSON.parse(data) : {}
    const userJoins = allJoins[userEmail] || { communities: [], events: [], opportunities: [] }

    const index = userJoins.communities.indexOf(communityId)
    if (index > -1) {
      userJoins.communities.splice(index, 1)
    } else {
      userJoins.communities.push(communityId)
    }

    allJoins[userEmail] = userJoins
    localStorage.setItem(this.KEYS.USER_JOINS, JSON.stringify(allJoins))
  }

  static toggleJoinEvent(userEmail: string, eventId: number): void {
    const data = localStorage.getItem(this.KEYS.USER_JOINS)
    const allJoins: Record<string, UserJoins> = data ? JSON.parse(data) : {}
    const userJoins = allJoins[userEmail] || { communities: [], events: [], opportunities: [] }

    const index = userJoins.events.indexOf(eventId)
    if (index > -1) {
      userJoins.events.splice(index, 1)
    } else {
      userJoins.events.push(eventId)
    }

    allJoins[userEmail] = userJoins
    localStorage.setItem(this.KEYS.USER_JOINS, JSON.stringify(allJoins))
  }

  static toggleJoinOpportunity(userEmail: string, opportunityId: number): void {
    const data = localStorage.getItem(this.KEYS.USER_JOINS)
    const allJoins: Record<string, UserJoins> = data ? JSON.parse(data) : {}
    const userJoins = allJoins[userEmail] || { communities: [], events: [], opportunities: [] }

    const index = userJoins.opportunities.indexOf(opportunityId)
    if (index > -1) {
      userJoins.opportunities.splice(index, 1)
    } else {
      userJoins.opportunities.push(opportunityId)
    }

    allJoins[userEmail] = userJoins
    localStorage.setItem(this.KEYS.USER_JOINS, JSON.stringify(allJoins))
  }

  static getActivities(userEmail?: string): VolunteerActivity[] {
    const data = localStorage.getItem(this.KEYS.ACTIVITIES)
    const activities: VolunteerActivity[] = data ? JSON.parse(data) : []
    return userEmail ? activities.filter((a) => a.userEmail === userEmail) : activities
  }

  static addActivity(activity: Omit<VolunteerActivity, "id">): VolunteerActivity {
    const activities = this.getActivities()
    const newActivity: VolunteerActivity = {
      ...activity,
      id: Date.now(),
    }
    activities.unshift(newActivity)
    localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(activities))
    return newActivity
  }

  static updateActivityStatus(activityId: number, status: "completed" | "ongoing" | "upcoming"): void {
    const activities = this.getActivities()
    const activity = activities.find((a) => a.id === activityId)
    if (activity) {
      activity.status = status
      localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(activities))
    }
  }
}
