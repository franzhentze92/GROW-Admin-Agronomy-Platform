@echo off
cd /d "%~dp0"
node fetch-events.cjs
pause 