#  👋
<p align="center">
  
   <img src="https://raw.githubusercontent.com/sarveshh/sarveshh/main/OIG.jpg" alt="Hero image" width="90px"/> 
<p/>
   <h1 align="center">Welcome to Spotify Now Playing Card 👋</h1>

   <p align="center">
  
  ### Default Variant
<img src="https://raw.githubusercontent.com/sarveshh/sarveshh/main/default.png" alt="Hero image"/>
<p/>


  <p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.11-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/sarveshh/handwriter#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/sarveshh/handwriter/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jayehernandez/letra-extension" />
  </a>
</p>
<br>
 
 ## ✨ Features

- Show Your current playing song anywhere in your Javascript app.
- Show current lyrics as you hear it.
- Multiple variants
- Customisable.

### Initial setup. (Only needed once)

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). You may need to login. Click on Create App button.
2. Fill information as you wish, just make sure your redirect URL is something which you can control. You will get 'Client Id' and 'Client Secret' from this step.
3. Open a browser window and go to the following URL, replacing CLIENT_ID and REDIRECT_URI with your own values.
```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=REDIRECT_URI&scope=user-read-playback-state%20user-read-recently-played
```
4. If done properly, this should prompt you to Authorize the app using your Spotify account. Login to your spotify Account. You will notice the browser address bar replaced with (https://my-domain.com/callback?code=NApCCg..BkWtQ&state=34fFs29kd09). Note the value following "code=". This is your "Access Token" and you will need it in the next step.
5. Take your Client ID and Secret ID and put them in the format "CliendID:SecretID" and Base64 encode them (I used https://www.base64encode.net/).
6. Use your Base64 encoded Client ID:Secret ID, Access Token, and Redirect URI to run this cURL command.
```
curl -X POST -H "Authorization: Basic BASE64_ENCODED_CLIENTID_CLIENTSECRET" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=REDIRECT_URI" https://accounts.spotify.com/api/token
```
7. If done properly, this will should give you your refresh token.
8. Import SPotifyNow Component and pass client_id client_secret and refresh_token as props with their respective values.

## 🛠 Built With

- Vite
- Tailwind Css
- Typescript
- Spotify Web Api

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />

Feel free to check the [issues page](https://github.com/sarveshh/spotifyNowPlaying/issues) for any open issues. If this is your first time contributing to Open Source, check out the [Contributing Guidelines](https://github.com/sarveshh/handwriter/blob/master/how_to_contribute.md).

You can also suggest a new feature by creating an Issue. Please wait for confirmation before working on it.

### Good for First Timers

- Create Custom Card and raise a PR.
- Write a code to get access token without making user search the browser

Give a ⭐️ if this project helped you!


## 📝 License

This project is [MIT](https://github.com/sarveshh/handwriter/LICENSE.md) licensed.
