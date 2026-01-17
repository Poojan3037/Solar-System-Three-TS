# 🌌 Solar System - Three.js & TypeScript

An interactive 3D solar system visualization built with Three.js, TypeScript, and Vite.

![Solar System](https://img.shields.io/badge/Three.js-0.182.0-black?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)

## 🚀 Live Demo

Check out the live version: [https://solar-system-three-ts.netlify.app/](https://solar-system-three-ts.netlify.app/)


## 🛠️ Tech Stack

- **Three.js** (v0.182.0) - 3D graphics library
- **TypeScript** (v5.9.3) - Type-safe JavaScript
- **Vite** (v7.2.4) - Next generation frontend tooling

## 📁 Project Structure

```
solar-system/
├── public/              # Static assets
├── src/                 # Source files
│   ├── main.ts         # Main application entry point
│   └── style.css       # Global styles
├── index.html          # HTML entry point
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd solar-system
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run preview` | Preview production build locally |


Made with ❤️ using Three.js and TypeScript
