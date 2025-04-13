#!/bin/bash
echo "Starting React Development Server..."
echo
echo "Note: This only starts the frontend. Make sure the Flask backend is running."
echo "Run the run_dev.sh script in another terminal to start the backend."
echo

cd app/client

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

echo "Starting React development server..."
npm start 