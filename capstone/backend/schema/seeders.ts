import dotenv from "dotenv";
import mongoose from "mongoose";
import Post from "./posts";
import User from "./users";
import bcrypt from "bcryptjs";
dotenv.config();

const users = [
  {
    name: "John Doe",
    username: "johndoe",
    password: "password123",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    username: "janesmith",
    password: "password456",
    email: "jane.smith@example.com",
  },
];

const posts = [
  {
    title: "Getting Started with MongoDB",
    body: "MongoDB is a powerful NoSQL database that stores data in flexible, JSON-like documents. In this post, we'll explore the basics of working with MongoDB and how it differs from traditional relational databases.",
  },
  {
    title: "Understanding Mongoose ODM",
    body: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to model your application data and includes built-in type casting, validation, and query building.",
  },
  {
    title: "Building REST APIs with Express",
    body: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. Today we'll cover best practices for creating RESTful APIs.",
  },
  {
    title: "Authentication Best Practices",
    body: "Security is paramount in modern web applications. This post covers essential authentication practices including password hashing with bcrypt, JWT tokens, and session management strategies.",
  },
  {
    title: "TypeScript in Node.js Projects",
    body: "TypeScript brings static typing to JavaScript, making your code more maintainable and reducing runtime errors. Learn how to set up and configure TypeScript in your Node.js projects effectively.",
  },
  {
    title: "Introduction to React Hooks",
    body: "React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore useState, useEffect, and custom hooks, along with practical examples for each.",
  },
  {
    title: "State Management with Redux",
    body: "Redux provides a predictable state container for JavaScript apps. We'll dive into the core concepts of actions, reducers, and the store, and when you should consider using Redux in your projects.",
  },
  {
    title: "Responsive Web Design Principles",
    body: "Creating websites that work seamlessly across all devices is essential. This post covers CSS Grid, Flexbox, media queries, and modern techniques for building responsive layouts.",
  },
  {
    title: "Optimizing Database Queries",
    body: "Database performance can make or break your application. Learn about indexing strategies, query optimization, and common pitfalls to avoid when working with MongoDB.",
  },
  {
    title: "Deployment Strategies for Node.js Apps",
    body: "Taking your application from development to production requires careful planning. We'll explore various deployment options including containers, serverless, and traditional hosting solutions.",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");

    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
    }

    for (let i = 0; i < createdUsers.length; i++) {
      const userPosts = posts.slice(i * 5, (i + 1) * 5);
      for (const postData of userPosts) {
        await Post.create({
          ...postData,
          user: createdUsers[i]._id,
        });
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
  }
}

export default seedDatabase;
