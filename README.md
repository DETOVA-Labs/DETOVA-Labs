This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

`TURSO_CONNECTION_URL`
`TURSO_AUTH_TOKEN`

You can get these values from your Turso dashboard.

## Database

This project uses [Drizzle ORM](https://orm.drizzle.team/) with a [Turso](https://turso.tech/) database.

To apply database migrations, run the following command:

```bash
npm run drizzle:push
```

## Deployment

To deploy this project, you can use any platform that supports Next.js. Here are the general steps:

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Set up environment variables:** Make sure to set the `TURSO_CONNECTION_URL` and `TURSO_AUTH_TOKEN` environment variables in your deployment environment.

3.  **Start the server:**

    ```bash
    npm start
    ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
