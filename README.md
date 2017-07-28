# URLockBox

## About

URLockbox is an app that allows a user to save links with a title and URL to read later. Each time a user marks a link unread, the link is sent to a second application that tracks all users' links' total read counts.

## Set up

- clone this repo
- bundle install
- rake db:create db:migrate
- run on local host by running rails s and going to localhost:3000 in your bbrowser
- rspec to run the test suite (you'll need version 46 of Firefox to work with Selenium)
