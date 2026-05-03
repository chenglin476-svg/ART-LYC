import express from 'express';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

app.use(express.json());

app.get('/api/notion', async (req, res) => {
  try {
    // 抓取 Notion 資料庫的內容
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
    });
    res.json(response.results);
  } catch (error: any) {
    console.error('Notion API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
