# Go to the Masonry-yard folder
Set-Location "docs/Masonry-yard"

# Remove the reconstructed repository
if (Test-Path "reui-upstream") {
    Remove-Item -Recurse -Force "reui-upstream"
}

# Clone the real upstream repository
git clone https://github.com/keenthemes/reui.git reui-upstream

# Verify
Set-Location "reui-upstream"

git remote -v
git status
git branch
git log --oneline -5