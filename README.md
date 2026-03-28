# E-SMILE: Premium Crochet E-Commerce 🧶✨

[![Netlify Status](https://api.netlify.com/api/v1/badges/2eb845e4-e644-4a2e-bac7-a6bccb1940c7/deploy-status)](https://app.netlify.com/projects/e-smile/deploys)

**E-SMILE** is a modern, responsive e-commerce web application designed for artisanal handmade crochet products. It features a custom-built cart system and an integrated WhatsApp ordering API.

## 🚀 Live Demo
Experience the live store here: [e-smile.netlify.app](https://e-smile.netlify.app)

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript.
- **Visuals:** AI-Generated Product Photography for a premium commercial look.
- **Deployment:** Netlify with GitHub CI/CD integration.
- **Data Management:** JSON-based product catalog and `localStorage` for cart persistence.

## 🌟 Key Features
- **Dynamic Cart Logic:** Users can add/remove products with quantities stored locally to prevent data loss on refresh.
- **WhatsApp Integration:** Automatically generates structured order messages containing Product IDs and Quantities for instant checkout.
- **High-End UI/UX:** Clean, minimalist design focused on product details and smooth navigation.
- **PWA Ready:** Includes `site.webmanifest` and optimized icons for a native app-like experience on mobile.

## 📂 Project Structure
```text
├── images/             # AI-enhanced product photography
├── index.html          # Homepage & Brand Story
├── products.html       # Product Gallery & Shopping Interface
├── products.json       # Product database (IDs, Names, Prices)
├── main.js             # Core logic for Cart, Storage, and WhatsApp API
├── master.css          # Global styles and animations
├── site.webmanifest    # Web App manifest for mobile installs
└── README.md           # Project documentation
```

## ⚙️ Technical Insight: Cart to WhatsApp
The checkout process parses the `localStorage` string, validates the items, and generates a URI-encoded message to bridge the gap between the web inventory and direct communication:
`https://wa.me/[Phone_Number]?text=[Encoded_Order_Details]`

## 👨‍💻 Author
**Ismail** *Informatics Engineering Student & Front-End Developer* [LinkedIn Profile](https://www.linkedin.com/in/esmael-bizo-9324413a1) | [GitHub](https://github.com/EsmaelBizo)

---
*Developed with a focus on blending technology with traditional arts.*