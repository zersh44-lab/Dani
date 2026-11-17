@echo off
title Push Dani Portfolio to GitHub and Deploy to Vercel
color 0b
echo ================================================================
echo   DANI STUDIO PORTFOLIO - GITHUB & VERCEL DEPLOYMENT
echo   Target: https://github.com/zersh44-lab/Dani.git
echo ================================================================
echo.
set "PATH=%PATH%;C:\Users\Abbay Sat\AppData\Local\Programs\Git\cmd"
cd /d "%~dp0"

echo Pushing all portfolio files and 37-page Media Pack to main branch...
echo (If prompted by GitHub, click "Sign in with your browser" to authorize)
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ================================================================
    echo   SUCCESS! Pushed to https://github.com/zersh44-lab/Dani
    echo   Vercel is now automatically deploying your live website!
    echo ================================================================
) else (
    echo.
    echo [NOTE] If push was denied or cancelled, you can also paste a 
    echo GitHub Personal Access Token in the chat window.
)
echo.
pause
