# ConvoCove

ConvoCove is a Discord-like real-time messaging and community platform built with Next.js, React, and a suite of modern technologies. It offers robust communication features and a sleek, responsive UI for desktop and mobile users.

## Key Features

- **Real-Time Messaging:** Powered by Socket.io for instant chat.
- **Attachments & Media:** Send files and images via UploadThing.
- **Message Editing & Deletion:** Update or remove messages in real time for all users.
- **Multi-Channel Communication:** Create text, audio, and video call channels.
- **1:1 Communication:** Enjoy private chats and video calls between members.
- **Member Management:** Tools to kick users and change roles (Guest/Moderator).
- **Invite System:** Unique invite link generation with a full working invite system.
- **Infinite Message Loading:** Batch loading of messages using @tanstack/query.
- **Server Creation & Customization:** Easily build and customize your own servers.
- **Beautiful UI:** Built with TailwindCSS and ShadcnUI, featuring light/dark mode.
- **Responsive Design:** Optimized for full responsiveness on mobile and desktop.
- **Fallback Mechanism:** Websocket fallback via polling with alerts.
- **Backend Integration:** ORM powered by Prisma and PostgreSQL (NeonDB).
- **Authentication:** Secure login and user management via Clerk.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/convocove.git
   cd convocove
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file at the root of the project and add your environment variables for Clerk, PostgreSQL, and any other required services.

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

5. **Open in Your Browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## 👏 Shoutout  
Huge thanks to **[Code With Antonio](https://www.youtube.com/@codewithantonio)** for the inspiration! 🙌

---

Feel free to contribute or reach out with questions. Enjoy building your community with ConvoCove!
