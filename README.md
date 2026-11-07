# OrientEck · Restaurant Website & Admin Workspace

Modern, high-performance oriental restaurant website with live customer ordering, real-time table reservations, contact messaging, and a real-time admin management workspace.

---

## 🚀 GitHub Actions Deployment Guide (GitHub Pages)

This project is fully configured for automated deployment to **GitHub Pages** via **GitHub Actions** using the `.github/workflows/static.yml` workflow.

### ধাপ ১: GitHub-এ কোড আপলোড করুন (Upload code to GitHub)

```bash
git init
git add .
git commit -m "Initial commit for OrientEck"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

### ধাপ ২: GitHub Settings থেকে Pages চালু করুন (Enable Pages in Settings)

1. আপনার GitHub রিপোজিটরি ওপেন করুন।
2. **Settings** ট্যাবে ক্লিক করুন।
3. বামপাশের মেনু থেকে **Pages**-এ যান।
4. **Build and deployment** সেকশনের নিচে **Source** ড্রপডাউনে:
   - সিলেক্ট করুন: **GitHub Actions**।
5. Save বা Apply করুন।

---

### ধাপ ৩: GitHub Action Workflow চালানো (Run GitHub Action)

- `.github/workflows/static.yml` ফাইলটি ইতিমধ্যেই রিপোজিটরিতে তৈরি করা আছে।
- আপনি যখনই কোড পুশ করবেন বা `main` ব্রাঞ্চে পরিবর্তন আনবেন, GitHub Actions স্বয়ংক্রিয়ভাবে:
  1. ডিপেনডেন্সি ইনস্টল করবে (`npm install`)
  2. সাইট বিল্ড করবে (`npm run build`)
  3. তৈরি হওয়া `./dist` ফোল্ডারটি GitHub Pages-এ লাইভ ডিপ্লয় করে দেবে!
- আপনি চাইলে সরাসরি **Actions** ট্যাবে গিয়ে **Deploy OrientEck to GitHub Pages** সিলেক্ট করে **Run workflow** বাটনে ক্লিক করেও যেকোনো সময় ম্যানুয়ালি ডিপ্লয় করতে পারবেন।

---

### 🌐 লাইভ লিঙ্ক (Live URLs)

ডিপ্লয় সফল হওয়ার পর আপনার সাইট নিচের লিঙ্কে লাইভ হবে:
- **গ্রাহক ওয়েবসাইট (Customer Site)**: `https://<your-username>.github.io/<your-repo-name>/`
- **অ্যাডমিন প্যানেল (Admin Workspace)**: `https://<your-username>.github.io/<your-repo-name>/admin.html`
