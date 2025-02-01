
# i understand it now (code edition)

SMU BIA Datathon 2025




## Features

Our solution is centered around extracting the entity relationships from the unstructure text provided in the dataset. From these relationships, we were able to form the following graphs:

- Knowledge network graph 🛜 (with Neo4j)
- Geomap 🗺️ (with Leaflet.js)
- Timeline ⏳ (React component)


## Installation

Before starting, ensure you have Node installed locally.

1. Clone the repository via:

```bash
  git clone https://github.com/jitthing/BIA-Datathon-2025.git
```

2. Navigate to the backend directory
```bash
  cd backend
```

3. Ensure you have the following environment variables in your backend folder:
```bash
  SUPABASE_URL=***
  SUPABASE_KEY=***
  SUPABASE_PASSWORD=***
  GOOGLE_MAPS_API_KEY=***
  NEO4J_URI=***
  NEO4J_USERNAME=***
  NEO4J_PASSWORD=***
  AURA_INSTANCEID=***
  AURA_INSTANCENAME=***
```

4. Install dependencies and run the backend server
```bash
  npm install
  npm run devStart
```

5. Navigate to the frontend directory
```bash
  cd my-nextjs-app
```

6. Ensure you have your backend endpoint as your environment variables:
```bash
  NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 
  (or whatever port your backend is running on)
```

7. Install dependencies and run the frontend server
```bash
  npm install 
  npm run dev
```

8. Access your application at http://locahost:3000
## Deployment

We deployed our frontend on Vercel, while our backend served on Render.

You can visit our deployed solution at the following link:

https://bia-datathon-2025.vercel.app/home

## Acknowledgements

 - [Neo4j](https://neo4j.com/)
 - [React Leaflet](https://react-leaflet.js.org/docs/example-popup-marker/)
 - [shadcn-timeline by timDeHof](https://github.com/timDeHof/shadcn-timeline)
