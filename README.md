# Fitting Room
## About
Many people have trouble finding the right outfit for the right occasion. This app is designed for people to exchange feedback on their outfits. This app fetches data from the web app and posts data back according to action.

## Key Features
1) Instagram-like Gallery View
Using ListView and CSS FlexBox, the data is fetched and displayed in a grid-like view. The most recent picture will always appear at the top left. 

2) Tinder Swipe to Like/Dislike
To show whether an outfit is approved, viewers have the choice to swipe right to like or left to dislike. The primary functionality of the code is written by Brent Vatne (https://github.com/brentvatne/react-native-animated-demo-tinder). With the appropriate toying, upon the completion of this action, the screen navigates back to the original gallery, and the number of likes and dislikes is displayed at the bottom of the screen. 

3) Navigation Bar
Using Navigation, the app can navigate and refresh to different screens. 

4) Working Camera/Upload from Gallery (Posting pictures to database)
By using Marc Shilling's package (https://github.com/marcshilling/react-native-image-picker) and encoding the picture into Base64, the received data will be stored properly.   

## Web App GitHub
https://github.com/yatmchang/demo

Status: Not deployed

## Sample Pictures
![Pic 1](/5.png?raw=true)
![Pic 2](/6.png?raw=true)
