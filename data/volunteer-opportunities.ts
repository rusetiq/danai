export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  category: string;
  description: string;
  emirate: string;
  location: string;
  time?: string;
  duration: string;
  numberOfVolunteers?: number;
  volunteers?: number;
  commitment?: string;
  urgency: "low" | "medium" | "high";
  remote: boolean;
  rating: number;
  impact: string;
  skills: string[];
  date: string;
}

export const volunteerOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    organization: "Green Earth UAE",
    category: "Environment",
    description: "Join us to clean up Dubai’s beaches and protect marine life.",
    emirate: "Dubai",
    location: "Jumeirah Beach",
    time: "10:00 AM",
    duration: "4 hours",
    numberOfVolunteers: 25,
    urgency: "medium",
    remote: false,
    rating: 4.8,
    impact: "Marine Protection",
    skills: ["Teamwork", "Environmental Awareness", "Sustainability"],
    date: "2025-10-12",
  },
  {
    id: 2,
    title: "Mangrove Restoration Project",
    organization: "Emirates Nature–WWF",
    category: "Environment",
    description: "Help plant mangroves in Abu Dhabi to restore coastal ecosystems.",
    emirate: "Abu Dhabi",
    location: "Jubail Mangrove Park",
    time: "9:00 AM",
    duration: "5 hours",
    numberOfVolunteers: 15,
    urgency: "high",
    remote: false,
    rating: 4.9,
    impact: "Ecosystem Recovery",
    skills: ["Planting", "Conservation", "Outdoor Work"],
    date: "2025-10-15",
  },
  {
    id: 3,
    title: "Community Recycling Awareness Campaign",
    organization: "Dubai Municipality",
    category: "Community Development",
    description:
      "Spread awareness about waste segregation and recycling across residential communities in Dubai.",
    emirate: "Dubai",
    location: "Al Barsha Community Center",
    commitment: "3 hours/week",
    duration: "1 month",
    volunteers: 40,
    urgency: "medium",
    remote: false,
    rating: 4.7,
    impact: "Waste Reduction",
    skills: ["Public Speaking", "Teamwork", "Environmental Advocacy"],
    date: "2025-10-20",
  },
].map((opp) => ({
  ...opp,
  urgency: (opp.urgency?.toLowerCase() || "medium") as "low" | "medium" | "high",
}));
