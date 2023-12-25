import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
interface ExtendedDocument extends Document {
  startViewTransition?: any;
}

// Define a type for the cursor object
type Cursor = {
  before: string;
  after: string;
};

// Define a type for the paging object
type Paging = {
  cursors: Cursor;
};

// Define a type for the user object
type User = {
  name: string;
  id: string;
};

// Define a type for the comment object
type Comment = {
  from: User;
  comment_count: number;
  message: string;
  id: string;
};

// Define a type for the post object
type Post = {
  message: string;
  comments: {
    data: Comment[];
    paging: Paging;
  };
  created_time: string;
  permalink_url: string;
  likes: {
    data: User[];
    paging: Paging;
  };
  id: string;
};

// Define a type for the picture object
type Picture = {
  data: {
    url: string;
  };
};

// Define a type for the main object
type PageData = {
  published_posts: {
    data: Post[];
    paging: Paging;
  };
  picture: Picture;
  followers_count: number;
  name: string;
  id: string;
};

type YelpBusinessInfo = {
  name: string;
  image: string;
  location: {
    address1: string;
    country: string;
    city: string;
  };
  openNow: boolean;
};

type YelpReview = {
  OverAllRating: string;
  FinalReview: string;
  max3PositiveThings: string[];
  max3NegativeThings: string[];
  RecommendationsForImprovement: string[];
};
