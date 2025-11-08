# 🧠 Automated COVID-19 Detection from Chest X-Rays

This project integrates **Deep Learning**, **Flask**, **React**, and **MySQL** to build a full-stack system that detects COVID-19 from chest X-ray images.  
It uses a **TensorFlow-based Convolutional Neural Network (CNN)** for image classification, a **Flask REST API** for backend services, and a **React frontend** for user interaction.  
MySQL handles user and doctor data to maintain secure authentication and history tracking.

---

## 📑 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Scripts Overview](#scripts-overview)
- [Future Improvements](#future-improvements)

---

## 🩺 Overview

This end-to-end application assists healthcare professionals in diagnosing COVID-19 using chest X-rays.  
The trained CNN model identifies infection patterns, while the integrated web stack handles image upload, prediction, and reporting through a simple browser interface.

---

## ⚙️ Key Features

- **Deep Learning Model**: TensorFlow CNN trained to classify X-ray images as *COVID* or *Non-COVID*.  
- **Interactive React Frontend**: Clean UI for uploading X-rays and viewing results.  
- **Flask RESTful API**: Serves predictions and handles user/doctor management.  
- **MySQL Database**: Stores user credentials, medical history, and doctor details.  
- **Cross-Origin Resource Sharing (CORS)**: Enables seamless frontend-backend communication.  

---

## 🧩 Architecture

React Frontend → Flask REST API → TensorFlow Model → MySQL Database


1. User uploads an image via the React interface.  
2. The Flask API preprocesses the image and runs it through the CNN model.  
3. The model returns a prediction which is displayed in the UI.  
4. The database logs user and doctor details securely.  

---

## 📁 Project Structure

.
├── backend/
│ ├── covid_classifier.py # Defines and trains the CNN model
│ ├── imageclassifier.py # Loads model and predicts on input images
│ ├── database.py # Manages user/doctor DB operations
│ ├── service.py # Flask REST API and endpoints
│ ├── sql.py # CLI for managing doctor data
│ └── requirements.txt # Python dependencies
├── frontend/
│ ├── src/ # React app source code
│ ├── public/
│ └── package.json
└── README.md


---

## 🧰 Installation

### Prerequisites
- Python 3.9+
- Node.js (with npm or yarn)
- MySQL Server

### Backend Setup
```bash
# Clone the repository
git clone <repository_url>
cd <repository_folder>/backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run the Flask API
python service.py

cd ../frontend
npm install
npm start
🚀 Usage
1. Train the Model

Edit dataset paths in covid_classifier.py and run:

python covid_classifier.py

2. Start Services

Flask API → python service.py

React App → npm start

3. Access the App

Open http://localhost:3000
 in your browser, upload an image, and get instant classification results.

🔌 API Reference
Endpoint	Method	Description
/detect	POST	Upload an image and get classification (“COVID” / “Non-COVID”)
/adddoctor	POST	Register a new doctor
/logindoctor	POST	Authenticate doctor credentials
🧠 Scripts Overview
Backend

covid_classifier.py – Builds and trains the CNN using TensorFlow

imageclassifier.py – Loads model and performs image classification

database.py – Handles CRUD operations for user/doctor data

service.py – Implements RESTful endpoints using Flask

sql.py – Command-line utility for managing doctor records

Frontend

React interface for uploading images, viewing results, and managing authentication

🔮 Future Improvements

Add Grad-CAM heatmaps to visualize infected lung regions

Integrate Docker for containerized deployment

Expand model to support multi-class pneumonia classification
