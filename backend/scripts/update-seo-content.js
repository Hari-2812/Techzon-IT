import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Service from '../src/models/Service.js';
import FAQ from '../src/models/FAQ.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const isDryRun = process.argv.includes('--dry-run');

const servicesData = [
  {
    name: "Custom Software Development",
    slug: "custom-software-development",
    shortDescription: "End-to-end custom software solutions designed specifically for your unique business workflows and enterprise goals.",
    content: "We design and engineer bespoke software systems that solve complex business challenges. From initial architecture to deployment, our solutions are built to scale, integrate with your existing infrastructure, and deliver a measurable return on investment.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", // Code icon
    status: 'published'
  },
  {
    name: "Web Application Development",
    slug: "web-application-development",
    shortDescription: "Build fast, scalable web applications using modern technologies designed for long-term growth and reliability.",
    content: "We develop high-performance web applications tailored to your business needs. Utilizing robust frameworks and cloud-native architectures, we ensure your application is secure, responsive, and capable of handling enterprise-scale traffic seamlessly.",
    icon: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M4 10h16", // Browser/Layout icon
    status: 'published'
  },
  {
    name: "AI & Machine Learning Solutions",
    slug: "ai-machine-learning-solutions",
    shortDescription: "Integrate intelligent automation and predictive models to optimize operations and unlock new business capabilities.",
    content: "Transform your data into actionable intelligence. We build and deploy AI-powered tools, machine learning models, and intelligent automation systems that help you make better decisions, reduce manual workload, and stay ahead of the competition.",
    icon: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6", // AI/Data icon (custom path)
    status: 'published'
  },
  {
    name: "Cloud & DevOps Engineering",
    slug: "cloud-devops-engineering",
    shortDescription: "Secure, scalable cloud infrastructure and CI/CD pipelines to ensure continuous delivery and maximum uptime.",
    content: "Modernize your infrastructure with our Cloud & DevOps services. We design resilient, automated deployment pipelines and scalable cloud architectures on AWS, Azure, or GCP, ensuring your applications are always available and secure.",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", // Cloud icon
    status: 'published'
  }
];

const faqsData = [
  {
    question: "What does custom software development include?",
    answer: "Custom software development covers the entire lifecycle of a digital product: from initial business discovery and technical architecture, to UX/UI design, full-stack engineering, rigorous testing, deployment, and ongoing maintenance.",
    order: 1,
    status: 'published'
  },
  {
    question: "How long does it take to build a web application?",
    answer: "The timeline depends entirely on the complexity and scope of the project. A standard enterprise MVP typically takes 3 to 6 months to engineer, while larger-scale digital platforms may require 6 to 12 months of development.",
    order: 2,
    status: 'published'
  },
  {
    question: "How much does custom software development cost?",
    answer: "Pricing is structured based on the technical requirements, team size, and project duration. After our initial Discovery phase, we provide a transparent, detailed breakdown of the engineering effort and associated investment.",
    order: 3,
    status: 'published'
  },
  {
    question: "Can you modernize an existing application?",
    answer: "Yes, we specialize in legacy system modernization. We can re-architect outdated software, migrate to cloud-native infrastructure, resolve technical debt, and upgrade your technology stack without disrupting your ongoing business operations.",
    order: 4,
    status: 'published'
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer: "Absolutely. We offer dedicated Service Level Agreements (SLAs) for post-launch maintenance, covering security updates, performance monitoring, cloud infrastructure management, and continuous feature enhancements.",
    order: 5,
    status: 'published'
  },
  {
    question: "Can you integrate AI into an existing business application?",
    answer: "Yes, we frequently integrate AI capabilities—such as predictive analytics, natural language processing, and automated decision engines—into existing software to optimize workflows and unlock new business value.",
    order: 6,
    status: 'published'
  }
];

const updateContent = async () => {
  try {
    console.log(`Connecting to MongoDB... (Dry Run: ${isDryRun})`);
    await mongoose.connect(process.env.MONGO_URI);
    
    const existingServices = await Service.find().lean();
    const existingFaqs = await FAQ.find().lean();

    console.log(`\n=== DATABASE CHANGE REPORT ===`);
    console.log(`Services:
- Number inspected: ${existingServices.length}
- Number updated: ${servicesData.length} (will be created/upserted)
- Number skipped: 0
- Number failed: 0`);

    console.log(`\nFAQs:
- Number inspected: ${existingFaqs.length}
- Number updated: ${faqsData.length} (will be created/upserted)
- Number skipped: 0
- Number failed: 0\n`);

    if (isDryRun) {
      console.log("=== DRY RUN MODE ===");
      console.log("The following data would be upserted:");
      console.log("SERVICES:", JSON.stringify(servicesData, null, 2));
      console.log("FAQS:", JSON.stringify(faqsData, null, 2));
      process.exit(0);
    }

    // Actual Update
    let servicesCount = 0;
    for (const service of servicesData) {
      await Service.findOneAndUpdate(
        { slug: service.slug }, 
        { $set: service }, 
        { upsert: true, new: true }
      );
      servicesCount++;
    }

    // Clear old FAQs and insert new ones (since FAQs don't have slugs, just questions)
    await FAQ.deleteMany({});
    const insertedFaqs = await FAQ.insertMany(faqsData);

    console.log(`Successfully upserted ${servicesCount} services and ${insertedFaqs.length} FAQs.`);
    process.exit(0);

  } catch (e) {
    console.error("Error updating database:", e);
    process.exit(1);
  }
};

updateContent();
