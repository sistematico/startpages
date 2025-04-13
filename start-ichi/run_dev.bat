@echo off
echo Starting Start Ichi in development mode...
echo.
echo This will start the Flask backend only. For full development,
echo you may also want to start the React development server.
echo.

cd app\server

IF NOT EXIST venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Starting Flask server...
python app.py

:: Deactivate virtual environment when the script exits
call venv\Scripts\deactivate.bat 