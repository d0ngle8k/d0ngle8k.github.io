export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: string;
  genre: string;
  description?: string;
}

export const musicTracks: Track[] = [
  {
    id: 1,
    title: "TRÌNH (prod. by Kewtiie)",
    artist: "HIEUTHUHAI",
    url: "/music/HIEUTHUHAI - TRÌNH (prod. by Kewtiie).mp3",
    duration: "-",
    genre: "Other",
    description: ""
  },
  {
    id: 2,
    title: "NXSTY BLOOD",
    artist: "Wels",
    url: "/music/Wels - NXSTY BLOOD.mp3",
    duration: "-",
    genre: "Other",
    description: ""
  },
  {
    id: 3,
    title: "八方來財 (slowed)",
    artist: "揽佬SKAI ISYOURGOD",
    url: "/music/揽佬SKAI ISYOURGOD - 八方來財 (slowed).mp3",
    duration: "-",
    genre: "Other",
    description: ""
  },
  {
    id: 4,
    title: "Prada - Theary Alex Remix",
    artist: "Unknown",
    url: "/music/Prada - Theary Alex Remix.mp3",
    duration: "-",
    genre: "Other",
    description: ""
  },
  {
    id: 5,
    title: "Young Black & Rich",
    artist: "Melly Mike",
    url: "/music/Melly Mike - Young Black & Rich.mp3",
    duration: "-",
    genre: "Other",
    description: ""
  }
];

export const tracksByGenre = {
  other: musicTracks
}; 