# Alok Kumar — Portfolio

A responsive, frontend-only portfolio built with React 18, Vite and Tailwind CSS. Portfolio copy, links, skills, projects and section lists live in `src/data/portfolioData.js`.

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

3. Create a production build:

   ```sh
   npm run build
   ```

   To preview the production build locally, run `npm run preview`.

## EmailJS contact form

The contact form uses EmailJS in the browser. A local `.env` with placeholders is included. Replace them with the three values from your EmailJS account. For a fresh checkout, copy `.env.example` to `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Configure the EmailJS template with these form field names: `from_name`, `reply_to`, and `message`. Restart the Vite server after changing environment values. If the keys are missing, the form prepares a message in the visitor's default email app instead.

## Resume

Replace `public/Alok_Kumar_Resume.pdf` with your current resume PDF. The hero's Download Resume link already points to this path.

## Deploy to Vercel

Push the project to GitHub and import the repository in Vercel. Vercel detects Vite automatically; the build command is `npm run build` and the output directory is `dist`. Add the same three `VITE_EMAILJS_*` values under the Vercel project's environment variables if you want the EmailJS form to send messages, then redeploy.

## Update portfolio content

Edit `src/data/portfolioData.js` to update text, navigation labels, links, skills, experience, education, certifications or contact details. Add a project by adding one object to the `projects.items` array. Project cards use CSS artwork by default; to add a cover screenshot, place it in `public/covers/` and set `coverImage` and `coverAlt` on that project object.
