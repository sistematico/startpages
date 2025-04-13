#!/bin/bash
echo "Starting Start Ichi in development mode..."
echo
echo "This will start the Flask backend only. For full development,"
echo "you may also want to start the React development server."
echo

cd app/server

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

pip install -r requirements.txt

echo "Starting Flask server..."
python app.py

# Deactivate virtual environment when script exits
deactivate 