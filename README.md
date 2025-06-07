
# DevTrove

DevTrove is a modern web app built for developers, offering a curated collection of development resources — from GitHub repositories and APIs to useful tools and developer-written articles.

## Tech Stack

Next.js (TypeScript) – for a fast, scalable React framework

TanStack Query (React Query) – handling all client-side data fetching

Dynamic Routing & SSG – leveraging the full power of Next.js features

API Sources:

GitHub API

DEV.to API

Custom local JSON files (for static and mock data)

## Features

 Browse and discover useful GitHub repositories

 Explore various developer tools

 Read up-to-date DEV.to articles

 Check out curated public APIs

 Superfast client-side fetching with useQuery

 Dynamic routing + Static Generation (SSG)

 ## Data Fetching 

 DevTrove uses client-side fetching exclusively via TanStack Query, even though it's built with Next.js. SSR is intentionally avoided for flexibility and simplicity.

### Sources:

GitHub REST API for trending repos

DEV.to API for latest articles

Local JSON files for APIs and tools

