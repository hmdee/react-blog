# Blog

A blogging platform built with React and Vite, enabling users to sign up, log in, create/edit/delete posts with images, and view them responsively. Features a fixed navbar, dynamic image sizing, and a custom favicon.

## Technologies Used

- **Frontend**: React (v18.x), Vite, React Router (v6.x), Tailwind CSS (v3.x), React Toastify (v9.x), Axios (v1.x).
- **Backend**: JSON Server on `http://localhost:5000`.
- **Image Hosting**: `imgbb.com` with API key, `imgbb-uploader` library.

## Setup and Running

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Backend Setup**:

   - In a separate directory (e.g., `../backend`), ensure a `db.json` file exists:

     ```json
     {
       "posts": [],
       "users": []
     }
     ```
   - Run JSON Server:

     ```bash
     cd ../backend
     json-server --watch db.json --port 5000
     ```

4. **Run the Frontend**:

   - From the `blog` directory:

     ```bash
     npm run dev
     ```
   - Open `http://localhost:5173` in a browser.

## Configuration

- **Backend**: JSON Server runs on `http://localhost:5000` with `/posts` and `/users` endpoints.
- **Image Uploads**: `imgbb.com` API key configured in `NewPost.jsx` for post images.

## Notes

- Posts display dynamically in `MyPosts.jsx` with aspect ratios based on image dimensions.
- 
