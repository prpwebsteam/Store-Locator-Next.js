import { connectDB } from '../../db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Error parsing form data' });
        return;
      }

      // Ensure the uploads directory exists
      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir, { recursive: true });
      }

      const file = files.markerImage ? files.markerImage[0] : null;
      let markerImageUrl = null;
      if (file && file._writeStream && file._writeStream.path) {
        const fileName = path.basename(file._writeStream.path);
        markerImageUrl = `/uploads/${fileName}`;
      }


      const formData = { ...fields, markerImage: markerImageUrl };

      try {
        const db = await connectDB();
        const result = await db.collection('settings').updateOne(
          { email: formData.email },
          { $set: formData }, // Update formData including markerImage
          { upsert: true }
        );

        if (result.upsertedCount > 0 || result.modifiedCount > 0) {
          res.status(200).json({ message: 'Settings saved successfully' });
        } else {
          res.status(500).json({ message: 'Failed to save settings' });
        }
      } catch (error) {
        console.error('Settings Error:', error);
        res.status(500).json({ message: 'Failed to save settings' });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const db = await connectDB();
      const settings = await db.collection('settings').findOne({ email: req.query.email });

      if (settings) {
        res.status(200).json(settings);
      } else {
        res.status(404).json({ message: 'Settings not found' });
      }
    } catch (error) {
      console.error('Settings Error:', error);
      res.status(500).json({ message: 'Failed to retrieve settings' });
    }
  } else {
    res.status(405).end();
  }
}