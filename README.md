# 📦 CSV Multi-Site Generator (React + Node.js)

This project generates multiple websites from a single CSV file.  
Each site is created from a React template (`react-template`) and customized with data from the CSV file.  

Additionally, if the text contains patterns like `[[ Quick | Fast | Speedy ]]`, one random word is picked during each site generation (e.g., `Quick delivery service in Dhaka`).

---

## 🚀 Features
- Generate multiple domain-specific sites at once  
- Auto-populate **title, description, phone, address** from CSV  
- Random word selection from `[[ ... | ... | ... ]]` syntax  
- Modern, responsive React websites using **Vite**  
- Each site is built into `build/<domain>` as a production-ready build  

---

## 📂 Project Structure
```
project/
│
├─ websites.csv # CSV file with domain + content
├─ start-all.js # Node.js automation script
├─ react-template/ # React template (Vite-based)
│ ├─ package.json
│ ├─ vite.config.js
│ └─ src/
│ ├─ App.jsx
│ ├─ Hero.jsx
│ └─ Contact.jsx
└─ build/ # Generated production sites
```

---

## 🛠️ Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/R0F7/csv-multi-site-generator.git
   cd csv-multi-site-generator

2. **Install root dependencies**
    ```bash
    npm install

3. **Prepare your websites.csv**
   ```bash
   domain,title,description,phone,address
   foodexpress.com,Food Express,Fresh food delivery,0123456789,"Dhaka, Bangladesh"
   techhubbd.com,Tech Hub,Latest gadgets online,0987654321,"Banani, Dhaka"
   bookbazaar.com,Book Bazaar,Buy and sell books,011223344,"Dhanmondi, Dhaka"

4. **Run the generator**
    ```bash
    npm start

5. **Check output** <br/>
   Generated sites will be available in:
   ```bash
   build/<domain>/

   Example:
   build/foodexpress.com
   build/techhubbd.com
   build/bookbazaar.com


## 📌 Notes

Inside start-all.js, the script copies the react-template for each domain.
It writes a src/props.js file containing the CSV data + random hero text.
Then it runs npm install && npm run build for each site.
Open the build output in your browser or serve with any static server.