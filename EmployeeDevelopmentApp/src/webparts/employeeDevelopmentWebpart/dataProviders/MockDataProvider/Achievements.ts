import IAchievement from '../../models/IAchievement';

const Icons = [
  "Accept",
  "Accounts",
  "AddFriend",
  "Admin",
  "Bookmarks",
  "BulletedList",
  "Calculator",
  "Calendar",
  "Camera",
  "Cancel",
  "Contact",
  "Dislike",
  "Download",
  "Emoji",
  "FavoriteStar",
  "FavoriteStarFill",
  "Folder",
  "FullScreen",
  "Globe",
  "Help",
  "Home",
  "Library",
  "Like",
  "Location",
  "Mail",
  "Memo",
  "Message",
  "Microphone",
  "Page",
  "People",
  "Permissions",
  "Phone",
  "Play",
  "PostUpdate",
  "Read",
  "Save",
  "Send",
  "Upload",
];

export const Achievements: {[Id: number]: IAchievement[]} = {  
  1:[
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "ipsum primis",
      description: "Desc m ligula tortor",
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "amet,",
      description: "faucibus orci"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "malesuada",
      description: "pellentesque eget, dictum placerat, augue. Sed molestie."
    },
  ],
  2:[
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "nunc",
      description: "velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices."
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "auctor",
      description: "sodales"
    },
  ],
  3:[
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "nunc",
      description: "velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices."
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "auctor",
      description: "sodales"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "amet,",
      description: "faucibus orci"
    },
  ],
  4:[
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "malesuada",
      description: "pellentesque eget, dictum placerat, augue. Sed molestie."
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "laoreet",
      description: "odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a,"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "fringilla.",
      description: "ornare, libero"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "dictum",
      description: "In lorem."
    },
  ],
  5:[
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "laoreet",
      description: "odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a,"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "fringilla.",
      description: "ornare, libero"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "dictum",
      description: "In lorem."
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "libero.",
      description: "vel sapien imperdiet ornare. In faucibus. Morbi"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      icon: Icons[Math.floor(Math.random() * Icons.length) + 1].toString(),
      title: "est arcu",
      description: "lorem"
    },
  ],
  6:[]
};