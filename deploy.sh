#! /usr/bin/env sh
# /usr/bin/env sh /Users/calebtracey/Code/robot-image-ui/deploy.sh

# abort on errors
set -e

# build
yarn run build

# navigate into the build output directory
cd /Users/calebtracey/Code/robot-image-ui/dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:CalebTracey/robot-image-ui.git main:gh-pages

cd -
