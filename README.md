# Quetre

[![Awesome Humane Tech](https://raw.githubusercontent.com/humanetech-community/awesome-humane-tech/main/humane-tech-badge.svg?sanitize=true)](https://github.com/humanetech-community/awesome-humane-tech)

Quetre is an alternative front-end to Quora.
It enables you to see answers without ads, trackers, and other such bloat.

---

## Key Features

- Privacy focused

  All requests except for images are proxied which makes it impossible for Quora to collate meaningful data points about you.

- No ads or tracking

  Absolutely no ads, no tracking, no browser fingerprinting, and no telemetry of any kind.

- Fully responsive layout

  Utilises modern CSS features like CSS Grid and Flexbox to make the website fully responsive for all screen sizes.

- Lightweight and fast

  As the website contains no bloat, pages load in a jiffy and request sizes are tiny.

- Dark and light themes

  Whether you're a nightowl or bright screen lover, you'll enjoy curated color scheme for your taste.

- Unofficial API support

  just add `/api/v1/` after the domain name in the URL and get a JSON repsonse.

---

## Screenshots

|                                                                  |                                                                 |
| :--------------------------------------------------------------: | :-------------------------------------------------------------: |
| ![website in light mode on desktop](public/misc/img/preview.png) | ![website in dark mode on mobile](public/misc/img/preview2.png) |

---

## Instances

| Instance URL                                              | Region  | Provider | Notes                                                     |
| --------------------------------------------------------- | ------- | -------- | --------------------------------------------------------- |
| [quetre.herokuapp.com](https://quetre.herokuapp.com)      | Europe  | Heroku   | Official instance                                         |
| [quora.vern.cc](https://quora.vern.cc) (Ratelimited)      | Canada  | OVHCloud | Operated by [~vern](https://vern.cc/)                     |
| [quetre.pussthecat.org](https://quetre.pussthecat.org/)   | Germany | &ndash;  | Operated by [PussTheCat.org](https://pussthecat.org/)     |
| [wuetre.herokuapp.com](https://wuetre.herokuapp.com/)     | Europe  | Heroku   | Operated by AnonymousZ                                    |
| [quetreus.herokuapp.com](https://quetreus.herokuapp.com/) | U.S.    | Heroku   | Operated by [toyboatcash](https://github.com/toyboatcash) |
| [quetre.tokhmi.xyz](https://quetre.tokhmi.xyz/)           | U.S.    | Oracle   | Operated by [Tokhmi](https://tokhmi.xyz)                  |

Centralisation is bad. Deploy your own instance if you can. It's easy and free with heroku.
Click the button below to get started:  
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/zyachel/quetre)

---

## Comparision

### Speed

URL for comparision: https://www.quora.com/How-does-the-Z-boson-decay
| | Quora | Quetre |
| :------------- | :---- | :------ |
| No. of requests | 83* | 15 |
| Load time | 6.76s | 4.61s |
| Finish time | 2.44min* | 4.62s |
| Data consumed | 3.49MB | 404.47KB |

\*the requests were ongoing even after 6 minutes

---

### Usability

- Quora: You can't even see an answer(unless you do some hacks) if you're not signed in. They put a big banner in front of answers to sign you up/in forcefully.

- Quetre: There is no accounts system. Just read whatever you want to read. Zero fuss.

---

### Privacy

#### Quora(when browsing anonymously)

From [their privacy policy](https://www.quora.com/about/privacy)

- Technologies used
  - cookies
  - log files
  - clear GIFs/pixel tags
  - JavaScript
  - web beacons
  - local storage objects
  - Analytics Tools
  - other tracking technologies
- Data collected
  - searches
  - page views
  - date and time of your visit
  - browser type
  - type of computer or mobile device
  - browser language
  - IP address
  - mobile carrier
  - unique device identifier
  - location
  - requested and referring URLs
  - other information about your use of the Quora Platform

#### Quetre

- Data actively collected by Quetre

  None.

- Data passively collected by Quetre

  Whenever you hit some error page, an error object is logged to the console on the server. That error object contains the resource url you were trying to access, and the usual stack trace. That's it.

- Data stored locally in your browser

  A key called 'theme' is stored in local storage provided by your browser to store your theme preference should you override the default theme. To prevent this behaviour, either disable JavaScript or local storage for Quetre.

- Data collected by other services

  If you're using the official instance(which is deployed on Heroku), Heroku might log your IP to prevent abuse. Also, as Quetre connects to '\*.quoracdn.net' and 'cdn.jsdelivr.net' for images and mathjax library respectively, both of these services might log some data. So, follow due precaution. Using a VPN might be a good idea. Or even better, consider hosting your own instance.

---

## FAQs

- There are some unreachable routes.

  I'm working to implement them soon. Keep an eye on [To-Do list](#to-do).

- Why is website connecting to '\*.quoracdn.net' and 'cdn.jsdelivr.net'?

  For the moment, images aren't proxied but directly fetched from quora. Hence the connection to quoracdn. As for the connection to jsdelivr, it is for an open source library – [Mathjax](https://www.mathjax.org/) – which is used to display math eqations nicely. If I get enough time, I'll include it locally.

- Why are some math equations showing up weirdly?

  If you're browsing with JavaScript disabled, then the Mathjax library isn't able to load and format tex equations. I'd recommend to enable JavaScript for it since there's no other way to show them in the browser. Even Quora uses Mathjax.

- Why can I only view a couple of answers?

  Quora doesn't show all answers at once. It only loads more answers as the user scrolls down. Furthermore, it uses many unique IDs to send ajax requests to fetch those answers. So, all in all, getting more answers isn't impossible but quite difficult requiring some serious amount of time on their website in order to figure out how it all happens. I'm short on time for now.

- Why am I getting a _Recheck the URL_ error?

  Sometimes Quora doesn't populate the answer page HTML, and hence, Quetre is unable to extract data from it. If that happens, you can refresh the page a couple of times to get the answers.

- I have some ideas/want to help.

  You're most welcome to do that. Just [contact me](#contact) or fork [the repo](https://github.com/zyachel/quetre/fork) and make a pull request. You can even help by correcting some typos or translating this README to other languages.

- Why the name Quetre?

  Quora is [supposedly](https://www.quora.com/Why-is-Quora-called-Quora-4) a portmanteau of 'Questions or answers'. In the same vein, Quetre is a portmanteau of 'Questions and answers', but [in Latin](https://lingva.ml/en/la/questions%20and%20answers%0A).

---

## To-Do

- [ ] add missing routes like topics, profile, and search
- [ ] use redis
- [ ] serve images and other assets from Quetre
- [x] implement a better installation method
- [ ] implement other trivial routes like a specific answer, spaces, etc.
- [ ] implement a way to get more answers(not a big priority as of now)

---

## Installation

### Manual

1. Install [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/). Instructions are on their websites.

2. Clone and set up the repository.

   ```bash
   git clone https://github.com/zyachel/quetre.git # replace github.com with codeberg.org if you're cloning from there
   cd quetre
   cp .env.example .env # you can make any changes here
   # change `pnpm` to `npm run` here as well as in package.json if you use `npm`
   pnpm install
   pnpm start
   ```

Quetre will start running at http://localhost:3000.

### Docker

To run quetre with Docker, you need to install Docker & docker-compose.

```bash
git clone https://github.com/zyachel/quetre.git # replace github.com with codeberg.org if you're cloning from there
cd quetre
docker-compose up -d #
```

---

## Misc

### Automatic redirection

Following extensions can be used to automatically redirect Quora URLs to Quetre:

- [redirector](https://github.com/einaregilsson/Redirector)  
  You can manually add any redirect.
  Below is a basic config of Quora to Quetre. Replace `quetre.herokuapp.com` in `Redirect to` to any instance of your choice.

  ```
  Description: Quora to Quetre
  Example URL: https://www.quora.com/What-is-Linux-4?share=1
  Include pattern: https?:\/\/(www\.)?quora\.com\/([^\?]*)
  Redirect to: https://quetre.herokuapp.com/$2
  Pattern type: Regular Expression
  Pattern description: redirects all Quora urls(excluding language-specific and spaces) to Quetre
  ```

  This config should output:  
  `Example result: https://quetre.herokuapp.com/What-is-Linux-4`

- [LibRedirect](https://github.com/libredirect/libredirect/)  
  Redirects many popular services to their alternative front-ends. Has a ton of features and an active community. Quetre is supported by default. So, no need to do anything.

### Other alternative front-ends

- [digitalblossom/alternative-frontends](https://github.com/digitalblossom/alternative-frontends): contains other alternative front-ends.
- [mendel5/alternative-front-ends](https://github.com/mendel5/alternative-front-ends): a bit more general, containing alternative clients too.

---

## Credits

### Programming

- [JavaScript](https://www.ecma-international.org/technical-committees/tc39/): programming language
- [Sass](https://sass-lang.com/): CSS preprocessor
- [Pug](https://pugjs.org/): Template engine
- [Node.js](https://nodejs.org/en/): JS runtime environmen
- [Express](http://expressjs.com/): Application framework for Node.js

### Resources

- [Inkscape](https://inkscape.org/): Vector graphics editor. Used for making logo and favicons
- [Material Design Icons](https://materialdesignicons.com/): Used for SVGs
- [Font Awesome](https://fontawesome.com/): Used for SVGs

### Code hosting

- [GitHub](https://github.com/). Quetre source code: [github.com/zyachel/quetre](https://github.com/zyachel/quetre)
- [Codeberg](https://codeberg.org/). Quetre source code: [codeberg.org/zyachel/quetre](https://codeberg.org/zyachel/quetre)

### Deployment

- [Heroku](https://www.heroku.com/)

### Inspiration

- [Teddit](https://codeberg.org/teddit/teddit)
- [Nitter](https://github.com/zedeus/nitter)

### Others

- Contributors
- Instance maintainers
- Users :)

---

## Contact

Send a message on [\[matrix\]](https://matrix.to/#/@ninal:matrix.org) or go old school with [email](mailto:aricla@protonmail.com) in case you wish to contact me.

---

## License

Licensed under [GNU AGPLv3](./LICENSE).
