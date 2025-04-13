@echo off
echo Starting React Development Server...
echo.
echo Note: This only starts the frontend. Make sure the Flask backend is running.
echo Run the run_dev.bat script in another terminal to start the backend.
echo.

cd app\client

IF NOT EXIST node_modules (
    echo Installing npm dependencies...
    call npm install
)

echo Starting React development server...
call npm start 