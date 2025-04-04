import cv2
import os
import numpy as np
from PIL import Image
import imagehash
from deepface import DeepFace

# Function to compute perceptual hash for basic comparison
def compute_hash(image_path):
    image = Image.open(image_path)
    return str(imagehash.phash(image))

# Function to perform feature matching using ORB
def feature_matching(image_path, database_path):
    # Load the image and database image
    query_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    database_image = cv2.imread(database_path, cv2.IMREAD_GRAYSCALE)

    if query_image is None or database_image is None:
        return []

    # Initialize ORB detector
    orb = cv2.ORB_create()

    # Detect ORB keypoints and descriptors in both images
    kp1, des1 = orb.detectAndCompute(query_image, None)
    kp2, des2 = orb.detectAndCompute(database_image, None)

    # Use a brute-force matcher to find the best matches
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(des1, des2)

    # Sort matches by distance (best matches first)
    matches = sorted(matches, key = lambda x: x.distance)

    # We will return the number of good matches as a simple metric
    good_matches = [m for m in matches if m.distance < 30]  # Set threshold based on experimentation
    return good_matches

# Placeholder for mock search
def mock_search(image_hash):
    # In a real system, you'd query a database or image repository
    # Return mock data for now
    return [
        {"source": "https://example.com/image1", "similarity": 92},
        {"source": "https://example.com/image2", "similarity": 88}
    ]

# Image search with real comparison (ORB + hash)
def search_image(image_path, database_folder):
    results = []
    
    for filename in os.listdir(database_folder):
        database_path = os.path.join(database_folder, filename)

        # Perform feature matching
        matches = feature_matching(image_path, database_path)

        if len(matches) > 0:
            similarity = len(matches) / 100  # Basic similarity metric (can be improved)
            results.append({
                "source": f"https://example.com/{filename}",
                "similarity": similarity * 100  # Convert to percentage
            })

    return results

# Function to analyze the image for AI detection
def ai_detection(image_path):
    try:
        analysis = DeepFace.analyze(image_path, actions=['age', 'gender', 'emotion'])
        return analysis
    except Exception as e:
        return {"error": str(e)}