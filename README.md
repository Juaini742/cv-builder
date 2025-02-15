# CV Builder

CV Builder is a web application that allows users to create, customize, and export professional CVs. Built using **Next.js 15**, **React 19**, **Tailwind CSS**, and other modern technologies, this application provides an intuitive and user-friendly experience.

## Features

- **User Authentication**: Secure authentication using **NextAuth.js** with Prisma as the database adapter.
- **Drag-and-Drop CV Customization**: Easily arrange sections of your CV.
- **Rich Text Editor**: Format text with **TinyMCE** for better content presentation.
- **PDF Export**: Convert your CV to **PDF** using **@react-pdf/renderer**.
- **Cloud Storage**: Upload and manage images via **Cloudinary**.
- **Dark Mode Support**: Seamless light/dark mode experience.
- **State Management**: Efficient state handling using **Zustand**.

## Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Database**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js
- **File Uploads**: Cloudinary
- **Forms & Validation**: React Hook Form, Zod
- **PDF Generation**: @react-pdf/renderer

## Installation

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- Cloudinary account for file uploads (optional)

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/Juaini742/cv-builder.git
   cd cv-builder
   ```

2. Install dependencies:

   ```sh
   npm install --force
   ```

3. Set up the environment variables in a `.env` file:

   ```env
   DATABASE_URL="your_database_url"
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   AUTH_SECRET="your_secret_key"
   NEXT_PUBLIC_EDITOR_SECRET="your_public_editor_key"
   AUTH_GOOGLE_ID="your_google_id"
   AUTH_GOOGLE_SECRET="your_google_secret"
   ```

4. Apply database migrations:

   ```sh
   npx prisma migrate dev
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build the application
- `npm run start` – Run the production server
- `npm run lint` – Run ESLint for code quality checks

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Contact

For questions or collaborations, feel free to reach out at [juaini742@gmail.com].
