# Automated Detection of COVID-19

This project combines deep learning, React, a RESTful API, and database management to detect COVID-19 from chest X-ray images. The solution uses TensorFlow for building a convolutional neural network (CNN), a Flask API for serving predictions, a React frontend for user interaction, and a MySQL database to manage user and doctor data.

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts Overview](#scripts-overview)
- [React Frontend](#react-frontend)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This project is designed to assist healthcare professionals in the automated diagnosis of COVID-19 using chest X-ray images. By integrating a trained CNN with a React-based web application and backend API, the system provides a complete workflow for user management, image classification, and reporting.

---

## Features

1. **Deep Learning-Based Classification**: A CNN trained to classify chest X-ray images as "COVID" or "Non-COVID."
2. **React Frontend**: A user-friendly web interface to upload and classify images.
3. **RESTful API**: A Flask-based API to handle user authentication, image processing, and classification.
4. **Database Integration**: Manages user and doctor data, including registration, login, and password management.
5. **Cross-Origin Support**: Supports web-based clients through CORS-enabled APIs.

---

## Project Structure

- **Backend**:
  - `covid_classifier.py`: Defines the CNN model for detecting COVID-19 from X-ray images.
  - `database.py`: Handles database connections and queries for user and doctor management.
  - `imageclassifier.py`: Loads the trained model and performs predictions on input images.
  - `service.py`: Flask-based API that provides endpoints for image classification and user management.
  - `sql.py`: Command-line interface for managing doctor data in the MySQL database.
- **Frontend**:
  - React application located in the `src/` directory for uploading and viewing classification results.

---

## Installation

### Prerequisites
- Python 3.8+
- Node.js and npm
- MySQL
- Required Python libraries (listed in `requirements.txt`)

### Steps
1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_folder>
2. **Set Up the Backend**
    ```bash
    python3 -m venv venv
    source venv/bin/activate   # Linux/Mac
    venv\Scripts\activate      # Windows
    pip install -r requirements.txt
3. **Set Up the Frontend**
4. **Run the Flask API**

## Usage
### Train the Model
Customize paths for the dataset in covid_classifier.py.
Train the model
### Start the React Frontend
Access the web application at http://localhost:3000.
### API Endpoints
/detect (POST): Upload an X-ray image to classify it as "COVID" or "Non-COVID."
/adddoctor (POST): Register a new doctor.
/logindoctor (POST): Authenticate a doctor.


## Scripts Overview
### Backend Scripts
covid_classifier.py: Builds and trains a CNN using TensorFlow.
database.py: Handles database operations like doctor registration and login.
imageclassifier.py: Performs image classification using the trained model.
service.py: Implements RESTful endpoints using Flask.
sql.py: A command-line interface for managing doctor data.
### React Frontend
The React application provides a user-friendly interface for:
Uploading chest X-ray images for classification.
Viewing classification results in real-time.
Managing user authentication and doctor registration.