import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from '../src/models/Service.js';
import FAQ from '../src/models/FAQ.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const inspect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const services = await Service.find().lean();
    const faqs = await FAQ.find().lean();
    
    console.log("=== SERVICES ===");
    console.log(JSON.stringify(services, null, 2));
    
    console.log("\n=== FAQS ===");
    console.log(JSON.stringify(faqs, null, 2));
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

inspect();
