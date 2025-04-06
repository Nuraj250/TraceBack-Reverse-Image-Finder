# 🕵️‍♂️ TraceBack – Reverse Image Finder

TraceBack is a full-stack web application built with **React** and **Flask** that allows you to:

- Upload an image via drag & drop or file picker
- Detect and compare it with existing images
- See visual similarity scores
- Analyze if it's AI-generated using DeepFace
- Export results to CSV or PDF

---

## 🚀 Features

- 🔍 Reverse image lookup using OpenCV feature matching (ORB)
- 🧬 Perceptual hashing for fast comparisons
- 🤖 AI image detection using DeepFace
- 📊 Visual similarity indicators
- 📁 Drag-and-drop upload
- 📤 Export results (CSV / PDF)

---

## 🖼️ Preview

### 🔼 Upload Image
![Upload](docs/screenshot-upload.jpeg)

### 📊 Matched Results
![Results](docs/screenshot-results.jpeg)

---

## 🧱 Tech Stack

| Frontend | Backend |
|----------|---------|
| React + Axios | Flask |
| HTML5 Drag-and-Drop | OpenCV (ORB) |
| FileSaver.js, jsPDF | DeepFace + Pillow + ImageHash |

---

## 🛠️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/traceback.git
cd traceback
```

---

### 2. Setup Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

> Flask runs on: `http://localhost:5000`

Make sure you have test images in `backend/static/database/`.

---

### 3. Setup Frontend (React)

```bash
cd ../frontend
npm install
npm start
```

> React runs on: `http://localhost:3000`

---

## 📂 Folder Structure

```
traceback/
├── backend/
│   ├── app.py
│   ├── static/uploads/
│   ├── static/database/
│   ├── utils/image_search.py
├── frontend/
│   ├── src/App.jsx
│   ├── src/components/ResultCard.jsx
│   ├── public/
│   └── docs/
│       ├── screenshot-upload.png
│       └── screenshot-results.png
├── README.md
```

---

## 📤 Exports

- 📄 Click “Export CSV” to download results in `.csv`
- 🧾 Click “Export PDF” for a clean printable report

---

## 💡 Future Ideas

- Image hosting (Cloudinary / S3)
- Save user history
- Real-time similarity percentage tuning
- Mobile UI optimization

---

## 📜 License

MIT © [Your Name](https://github.com/your-username)
```

---

### 📸 Where to Put Screenshots

1. Create this folder in your project:
   ```
   frontend/public/docs/
   ```

2. Add:
   - `screenshot-upload.png`
   - `screenshot-results.png`

> If you want, send me the images you want to use, and I’ll crop/optimize them for you.

Let me know if you also want a GitHub Actions CI setup or deployment guide next!