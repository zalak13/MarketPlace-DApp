rsync -r src/ docs/
rsync build/contracts/MarketPlace.json docs/
git add .
git commit -m "Adding frontend files to Github Pages"
git push
