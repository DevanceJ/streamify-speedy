import { create } from "zustand";

interface RevenueSource {
  source: string;
  amount: number;
  fill?: string;
}

interface StreamedSong {
  songName: string;
  artist: string;
  streamCount: number;
}
interface MonthlyMetrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
  revenueSources: RevenueSource[];
  streamedSongs: StreamedSong[];
}

interface StreamDetail {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

interface MetricsState {
  monthlyMetrics: { [month: string]: MonthlyMetrics };
  streamDetails: StreamDetail[];
}

const initialMonthlyMetrics: { [month: string]: MonthlyMetrics } = {
  January: {
    totalUsers: 1000,
    activeUsers: 800,
    totalStreams: 4000,
    revenue: 5000,
    topArtist: "Taylor Swift",
    revenueSources: [
      { source: "Ads", amount: 1000 },
      { source: "Subscriptions", amount: 2000 },
      { source: "Merchandise", amount: 1000 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      { songName: "Blank Space", artist: "Taylor Swift", streamCount: 500 },
      { songName: "Shape of You", artist: "Ed Sheeran", streamCount: 450 },
      {
        songName: "Thank U, Next",
        artist: "Ariana Grande",
        streamCount: 400,
      },
      { songName: "Shake It Off", artist: "Taylor Swift", streamCount: 350 },
      { songName: "God's Plan", artist: "Drake", streamCount: 300 },
    ],
  },
  February: {
    totalUsers: 1200,
    activeUsers: 900,
    totalStreams: 4500,
    revenue: 5500,
    topArtist: "Ed Sheeran",
    revenueSources: [
      { source: "Ads", amount: 1200 },
      { source: "Subscriptions", amount: 2200 },
      { source: "Merchandise", amount: 1100 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      { songName: "Perfect", artist: "Ed Sheeran", streamCount: 550 },
      { songName: "Love Story", artist: "Taylor Swift", streamCount: 500 },
      { songName: "7 Rings", artist: "Ariana Grande", streamCount: 450 },
      {
        songName: "Thinking Out Loud",
        artist: "Ed Sheeran",
        streamCount: 400,
      },
      { songName: "Hotline Bling", artist: "Drake", streamCount: 350 },
    ],
  },
  March: {
    totalUsers: 1500,
    activeUsers: 1000,
    totalStreams: 5000,
    revenue: 6200,
    topArtist: "Taylor Swift",
    revenueSources: [
      { source: "Ads", amount: 1500 },
      { source: "Subscriptions", amount: 2500 },
      { source: "Merchandise", amount: 1200 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      { songName: "Bad Blood", artist: "Taylor Swift", streamCount: 600 },
      {
        songName: "Castle on the Hill",
        artist: "Ed Sheeran",
        streamCount: 550,
      },
      { songName: "Into You", artist: "Ariana Grande", streamCount: 500 },
      { songName: "The Motto", artist: "Drake", streamCount: 450 },
      { songName: "Delicate", artist: "Taylor Swift", streamCount: 400 },
    ],
  },

  April: {
    totalUsers: 1800,
    activeUsers: 1300,
    totalStreams: 5000,
    revenue: 6900,
    topArtist: "Drake",
    revenueSources: [
      { source: "Ads", amount: 1800 },
      { source: "Subscriptions", amount: 2800 },
      { source: "Merchandise", amount: 1300 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      { songName: "One Dance", artist: "Drake", streamCount: 650 },
      { songName: "Photograph", artist: "Ed Sheeran", streamCount: 600 },
      {
        songName: "No Tears Left to Cry",
        artist: "Ariana Grande",
        streamCount: 550,
      },
      {
        songName: "Wildest Dreams",
        artist: "Taylor Swift",
        streamCount: 500,
      },
      { songName: "Style", artist: "Taylor Swift", streamCount: 450 },
    ],
  },

  May: {
    totalUsers: 2000,
    activeUsers: 1600,
    totalStreams: 5500,
    revenue: 7400,
    topArtist: "Taylor Swift",
    revenueSources: [
      { source: "Ads", amount: 2000 },
      { source: "Subscriptions", amount: 3000 },
      { source: "Merchandise", amount: 1400 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      {
        songName: "You Belong with Me",
        artist: "Taylor Swift",
        streamCount: 700,
      },
      { songName: "Happier", artist: "Ed Sheeran", streamCount: 650 },
      { songName: "Breathin", artist: "Ariana Grande", streamCount: 600 },
      { songName: "Controlla", artist: "Drake", streamCount: 550 },
      { songName: "Lover", artist: "Taylor Swift", streamCount: 500 },
    ],
  },

  June: {
    totalUsers: 2200,
    activeUsers: 1800,
    totalStreams: 6000,
    revenue: 5700,
    topArtist: "Ed Sheeran",
    revenueSources: [
      { source: "Ads", amount: 2200 },
      { source: "Subscriptions", amount: 3200 },
      { source: "Merchandise", amount: 1500 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      {
        songName: "I Don't Want to Live Forever",
        artist: "Zayn",
        streamCount: 750,
      },
      {
        songName: "Supermarket Flowers",
        artist: "Ed Sheeran",
        streamCount: 700,
      },
      {
        songName: "Break Up with Your Girlfriend, I'm Bored",
        artist: "Ariana Grande",
        streamCount: 650,
      },
      { songName: "In My Feelings", artist: "Drake", streamCount: 600 },
      {
        songName: "Back to December",
        artist: "Taylor Swift",
        streamCount: 550,
      },
    ],
  },

  July: {
    totalUsers: 2500,
    activeUsers: 2000,
    totalStreams: 6500,
    revenue: 8000,
    topArtist: "Taylor Swift",
    revenueSources: [
      { source: "Ads", amount: 2500 },
      { source: "Subscriptions", amount: 3500 },
      { source: "Merchandise", amount: 1000 },
      { source: "Concerts", amount: 1000 },
    ],
    streamedSongs: [
      { songName: "All Too Well", artist: "Taylor Swift", streamCount: 800 },
      { songName: "Galway Girl", artist: "Ed Sheeran", streamCount: 750 },
      { songName: "7 Rings", artist: "Ariana Grande", streamCount: 700 },
      { songName: "Hotline Bling", artist: "Drake", streamCount: 650 },
      { songName: "Style", artist: "Taylor Swift", streamCount: 600 },
    ],
  },

  August: {
    totalUsers: 3000,
    activeUsers: 2500,
    totalStreams: 7000,
    revenue: 10000,
    topArtist: "Michael Jackson",
    revenueSources: [
      { source: "Ads", amount: 3000 },
      { source: "Subscriptions", amount: 3500 },
      { source: "Merchandise", amount: 1500 },
      { source: "Concerts", amount: 2000 },
    ],
    streamedSongs: [
      {
        songName: "Smooth Criminal",
        artist: "Michael Jackson",
        streamCount: 900,
      },
      { songName: "Lover", artist: "Taylor Swift", streamCount: 800 },
      { songName: "7 Rings", artist: "Ariana Grande", streamCount: 750 },
      { songName: "In My Feelings", artist: "Drake", streamCount: 700 },
      {
        songName: "Wildest Dreams",
        artist: "Taylor Swift",
        streamCount: 650,
      },
    ],
  },
  September: {
    totalUsers: 3500,
    activeUsers: 3000,
    totalStreams: 7500,
    revenue: 12000,
    topArtist: "Ariana Grande",
    revenueSources: [
      { source: "Ads", amount: 3500 },
      { source: "Subscriptions", amount: 4000 },
      { source: "Merchandise", amount: 2000 },
      { source: "Concerts", amount: 2500 },
    ],
    streamedSongs: [
      { songName: "Into You", artist: "Ariana Grande", streamCount: 900 },
      { songName: "Lover", artist: "Taylor Swift", streamCount: 800 },
      { songName: "7 Rings", artist: "Ariana Grande", streamCount: 750 },
      { songName: "In My Feelings", artist: "Drake", streamCount: 700 },
      {
        songName: "Wildest Dreams",
        artist: "Taylor Swift",
        streamCount: 650,
      },
    ],
  },

  October: {
    totalUsers: 3500,
    activeUsers: 2000,
    totalStreams: 4000,
    revenue: 8000,
    topArtist: "Drake",
    revenueSources: [
      { source: "Ads", amount: 1000 },
      { source: "Subscriptions", amount: 2000 },
      { source: "Merchandise", amount: 2000 },
      { source: "Concerts", amount: 3000 },
    ],
    streamedSongs: [
      { songName: "One Dance", artist: "Drake", streamCount: 700 },
      { songName: "Lover", artist: "Taylor Swift", streamCount: 500 },
      { songName: "7 Rings", artist: "Ariana Grande", streamCount: 500 },
      { songName: "In My Feelings", artist: "Drake", streamCount: 400 },
      {
        songName: "Wildest Dreams",
        artist: "Taylor Swift",
        streamCount: 250,
      },
    ],
  },
};

const initialStreamDetails: StreamDetail[] = [
  {
    songName: "Blank Space",
    artist: "Taylor Swift",
    dateStreamed: "2024-01-01",
    streamCount: 100,
    userId: "user-1",
  },
  {
    songName: "Shape of You",
    artist: "Ed Sheeran",
    dateStreamed: "2024-01-01",
    streamCount: 200,
    userId: "user-5",
  },
  {
    songName: "Shake It Off",
    artist: "Taylor Swift",
    dateStreamed: "2024-01-01",
    streamCount: 400,
    userId: "user-4",
  },
  {
    songName: "God's Plan",
    artist: "Drake",
    dateStreamed: "2024-01-01",
    streamCount: 500,
    userId: "user-5",
  },
  {
    songName: "Perfect",
    artist: "Ed Sheeran",
    dateStreamed: "2024-02-01",
    streamCount: 100,
    userId: "user-1",
  },
  {
    songName: "Love Story",
    artist: "Taylor Swift",
    dateStreamed: "2024-02-01",
    streamCount: 200,
    userId: "user-2",
  },
  {
    songName: "Thinking Out Loud",
    artist: "Ed Sheeran",
    dateStreamed: "2024-02-01",
    streamCount: 400,
    userId: "user-4",
  },
  {
    songName: "Hotline Bling",
    artist: "Drake",
    dateStreamed: "2024-02-01",
    streamCount: 500,
    userId: "user-5",
  },
  {
    songName: "Bad Blood",
    artist: "Taylor Swift",
    dateStreamed: "2024-03-01",
    streamCount: 100,
    userId: "user-1",
  },
  {
    songName: "Castle on the Hill",
    artist: "Ed Sheeran",
    dateStreamed: "2024-03-01",
    streamCount: 200,
    userId: "user-2",
  },
  {
    songName: "The Motto",
    artist: "Drake",
    dateStreamed: "2024-03-01",
    streamCount: 400,
    userId: "user-4",
  },
  {
    songName: "Delicate",
    artist: "Taylor Swift",
    dateStreamed: "2024-03-01",
    streamCount: 500,
    userId: "user-5",
  },
  {
    songName: "One Dance",
    artist: "Drake",
    dateStreamed: "2024-04-01",
    streamCount: 100,
    userId: "user-1",
  },
  {
    songName: "Photograph",
    artist: "Ed Sheeran",
    dateStreamed: "2024-04-01",
    streamCount: 200,
    userId: "user-2",
  },
  {
    songName: "Wildest Dreams",
    artist: "Taylor Swift",
    dateStreamed: "2024-04-01",
    streamCount: 400,
    userId: "user-4",
  },
  {
    songName: "Style",
    artist: "Taylor Swift",
    dateStreamed: "2024-04-01",
    streamCount: 500,
    userId: "user-5",
  },
];

export const useMetricsStore = create<MetricsState>()(() => ({
  monthlyMetrics: initialMonthlyMetrics,
  streamDetails: initialStreamDetails,
}));
