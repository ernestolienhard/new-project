if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error 'Git is not installed or not available on PATH. Install Git, then rerun this script.'
  exit 1
}

Set-Location $PSScriptRoot

git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/ernestolienhard/new-project.git

git push -u origin main
