## Scientific Research Assistant

Minimal Next.js 14 (App Router) workspace with Tailwind CSS and React Query that submits research questions to OpenAI and returns structured summaries, data tables, and expandable citations.

### Prerequisites

- Node.js 18+
- An OpenAI API key with access to the specified model.

Create a `.env.local` file in the project root and set:

```bash
OPENAI_API_KEY=sk-your-key
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the interface. The API route at `/api/query` runs only on the server and never exposes your API key.

### Production build

```bash
npm run build
npm start
```
# research-assistant
