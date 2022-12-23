# Quetre
<div align="center">

  [![Awesome Humane Tech](https://raw.githubusercontent.com/humanetech-community/awesome-humane-tech/main/humane-tech-badge.svg?sanitize=true)](https://github.com/humanetech-community/awesome-humane-tech)
  [![GitHub issues](https://img.shields.io/github/issues/zyachel/quetre?style=flat-square)](https://github.com/zyachel/quetre/issues)
  ![GitHub pull requests](https://img.shields.io/github/issues-pr/zyachel/quetre?style=flat-square)
  [![GitHub forks](https://img.shields.io/github/forks/zyachel/quetre?style=flat-square)](https://github.com/zyachel/quetre/network)
  [![GitHub stars](https://img.shields.io/github/stars/zyachel/quetre?style=flat-square)](https://github.com/zyachel/quetre/stargazers)
  [![GitHub license](https://img.shields.io/github/license/zyachel/quetre?style=flat-square)](https://github.com/zyachel/quetre/blob/main/LICENSE)
  ![GitHub contributors](https://img.shields.io/github/contributors/zyachel/quetre?style=flat-square)
  ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/zyachel/quetre?style=flat-square)
  ![GitHub release (latest by date)](https://img.shields.io/github/v/release/zyachel/quetre?style=flat-square)

</div>
Quetre is an alternative front-end to Quora.
It enables you to see answers without ads, trackers, and other such bloat.

---

## Key Features

- Privacy focused

  All requests are proxied which makes it impossible for Quora to collate meaningful data points about you.

- No ads or tracking

  Absolutely no ads, no tracking, no browser fingerprinting, and no telemetry of any kind.

- Fully responsive layout

  Utilises modern CSS features like CSS Grid and Flexbox to make the website fully responsive for all screen sizes.

- Lightweight and fast

  As the website contains no bloat, pages load in a jiffy and request sizes are tiny.

- Dark and light themes

  Whether you're a nightowl or bright screen lover, you'll enjoy curated color scheme for your taste.

- Unofficial API support

  just add `/api/v1/` after the domain name in the URL and get a JSON response.


---

## Screenshots

|                                                                  |                                                                 |
| :--------------------------------------------------------------: | :-------------------------------------------------------------: |
| ![website in light mode on desktop](public/misc/img/preview.png) | ![website in dark mode on mobile](public/misc/img/preview2.png) |

---

## Instances

<!-- prettier-ignore -->
| Instance | Region | Provider | Notes |
| -------- | ------ | -------- | ----- |
| 1. Clearnet | | | |
| [quetre.iket.me](https://quetre.iket.me/) | Canada | OVHCloud | Official instance |
| [quora.vern.cc](https://qr.vern.cc) | US | Hetzner | Operated by [~vern](https://vern.cc/) |
| [quetre.pussthecat.org](https://quetre.pussthecat.org/) | Germany | &ndash; | Operated by [PussTheCat.org](https://pussthecat.org/) |
| [quetre.tokhmi.xyz](https://quetre.tokhmi.xyz/) | U.S. | Oracle | Operated by [Tokhmi](https://tokhmi.xyz) |
| [quetre.projectsegfau.lt](https://quetre.projectsegfau.lt/) | Europe | BuyVM | Operated by [Project Segfault](https://projectsegfau.lt) |
| [quetre.esmailelbob.xyz](https://quetre.esmailelbob.xyz/) | Canada | OVHCloud | Operated by [Esmail EL BoB](https://esmailelbob.xyz/) |
| [quetre.odyssey346.dev](https://quetre.odyssey346.dev) | Poland | OVHCloud | Operated by [Odyssey346](https://odyssey346.dev/) |
| [quetre.privacydev.net](https://quetre.privacydev.net) | U.S. | BuyVM | Operated by [PrivacyDev](https://privacydev.net/) |
| [ask.habedieeh.re](https://ask.habedieeh.re) | Canada | Oracle | Operated by [habedieeh.re](https://www.habedieeh.re) |
| [quetre.marcopisco.com](https://quetre.marcopisco.com) | Portugal | Vodafone Portugal (Cloudflare) | Operated by [marcopisco.com](https://www.marcopisco.com) |
| [quetre.blackdrgn.nl](https://quetre.blackdrgn.nl) | Germany | Contabo | Operated by [blackdrgn.nl](https://blackdrgn.nl) |
| [quetre.pufe.org](https://quetre.pufe.org) | New Zealand | - | Operated by pufe.org |
| 2. Onion | | | |
| [quetre.esmail5pdn24shtvieloeedh7ehz3nrwcdivnfhfcedl7gf4kwddhkqd.onion](http://quetre.esmail5pdn24shtvieloeedh7ehz3nrwcdivnfhfcedl7gf4kwddhkqd.onion) | Canada | OVHCloud | Operated by [Esmail EL BoB](https://esmailelbob.xyz/) |
| [qr.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion](http://qr.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion/) | US | Hetzner | Operated by [~vern](https://vern.cc) |
| [ask.habeehrhadazsw3izbrbilqajalfyqqln54mrja3iwpqxgcuxnus7eid.onion](http://ask.habeehrhadazsw3izbrbilqajalfyqqln54mrja3iwpqxgcuxnus7eid.onion/) | Canada | Oracle | Operated by [habedieeh.re](https://www.habedieeh.re) |
| [quetre.g4c3eya4clenolymqbpgwz3q3tawoxw56yhzk4vugqrl6dtu3ejvhjid.onion](http://quetre.g4c3eya4clenolymqbpgwz3q3tawoxw56yhzk4vugqrl6dtu3ejvhjid.onion/) | U.S. | BuyVM | Operated by [PrivacyDev](https://privacydev.net/) |
| 3. I2P | | | |
| [http://qr.vern.i2p/](http://vernnflenvsqccuanaun7yydnmturi4jkyxlyzhn6ultpje66c3q.b32.i2p/) | US | Hetzner | Operated by [~vern](https://vern.cc) |

---

## Comparision

### Speed

URL for comparision: https://www.quora.com/How-does-the-Z-boson-decay

|                 | Quora     | Quetre   |
| --------------- | --------- | -------- |
| No. of requests | 83\*      | 15       |
| Load time       | 6.76s     | 4.61s    |
| Finish time     | 2.44min\* | 4.62s    |
| Data consumed   | 3.49MB    | 404.47KB |

\*the requests were ongoing even after 6 minutes

---

### Usability

- Quora: You can't even see an answer (unless you do some hacks) if you're not signed in. They put a big banner in front of answers to sign you up/in forcefully.

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

---

## FAQs

- How do I use this?

  Replace 'www.quora.com' in any URL with 'quetre.iket.me'. So, 'https://www.quora.com/Are-Nubians-nilotes' becomes 'https://quetre.iket.me/Are-Nubians-nilotes'.

- I don't want to edit the URLs manually!

  There are [a couple of solutions](#automatic-redirection) for that.

- There are some unreachable routes.

  I'm working to implement them soon. Keep an eye on [To-Do list](#to-do).

- Why are some math equations showing up weirdly?

  If you're browsing with JavaScript disabled, then the Mathjax library isn't able to load and format tex equations. I'd recommend to enable JavaScript for it since there's no other way to show them in the browser. Even Quora uses Mathjax.

- Why can I only view a couple of answers?

  Quora doesn't show all answers at once. It only loads more answers as the user scrolls down. Furthermore, it uses many unique IDs to send ajax requests to fetch those answers. So, all in all, getting more answers isn't impossible but quite difficult requiring some serious amount of time on their website in order to figure out how it all happens. I'm short on time for now.

- Why am I getting a _Recheck the URL_ error?

  Sometimes Quora doesn't populate the answer page HTML, and hence, Quetre is unable to extract data from it. If that happens, you can refresh the page a couple of times to get the answers.

- I have some ideas/want to help.

  You're most welcome to do that. Just [contact me](#contact) or fork [the repo](https://github.com/zyachel/quetre/fork) and make a pull request. You can even help by correcting some typos or translating this README to other languages.

- Why the name Quetre?

  Quora is [supposedly](https://www.quora.com/Why-is-Quora-called-Quora-4) a portmanteau of 'Questions or answers'. In the same vein, Quetre is a portmanteau of 'Questions and answers', but [in Latin](https://lingva.ml/en/la/questions%20and%20answers%0A).

- I cannot view the comments. Will you add that feature?

  See [this issue](https://codeberg.org/zyachel/quetre/issues/11)

---

## To-Do

- [x] add missing routes like topics, profile, and search
- [ ] use redis
- [x] serve images and other assets from Quetre
- [x] implement a better installation method
- [ ] implement other trivial routes like a specific answer, spaces, etc.
- [ ] implement a way to get more answers (not a big priority as of now)

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

There is a [docker image](https://github.com/PussTheCat-org/docker-quetre-quay) made by [@TheFrenchGhosty](https://github.com/TheFrenchGhosty) for [PussTheCat.org](https://pussthecat.org/)'s [instance](https://quetre.pussthecat.org/). You can check that out case you want to go the docker way.

---

## Contributing

The development may seem slow as I don't have lots of free time. And whenever I do, it gets split between this service and [libremdb](https://github.com/zyachel/libremdb/).  
If you believe you can help furthering this project in any way(be it maintaining, fixing issues, or adding features), please [get in touch](#contact).  
Regardless, any type of contribution is always welcome.

## Misc

### Automatic redirection

Following extensions can be used to automatically redirect Quora URLs to Quetre:

- [redirector](https://github.com/einaregilsson/Redirector)  
  You can manually add any redirect.
  Below is a basic config of Quora to Quetre. Replace `quetre.iket.me` in `Redirect to` to any instance of your choice.

  ```
  Description: Quora to Quetre
  Example URL: https://www.quora.com/What-is-Linux-4?share=1
  Include pattern: https?:\/\/(www\.)?quora\.com\/([^\?]*)
  Redirect to: https://quetre.iket.me/$2
  Pattern type: Regular Expression
  Pattern description: redirects all Quora urls(excluding language-specific and spaces) to Quetre
  ```

  This config should output:  
  `Example result: https://quetre.iket.me/What-is-Linux-4`

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
- [Node.js](https://nodejs.org/en/): JS runtime environment
- [Express](http://expressjs.com/): Application framework for Node.js

### Resources

- [Inkscape](https://inkscape.org/): Vector graphics editor. Made Quetre logo and favicons
- [Material Design Icons](https://materialdesignicons.com/): SVGs
- [Font Awesome](https://fontawesome.com/): SVGs

### Code hosting

- [GitHub](https://github.com/). Quetre source code: [github.com/zyachel/quetre](https://github.com/zyachel/quetre)
- [Codeberg](https://codeberg.org/). Quetre source code: [codeberg.org/zyachel/quetre](https://codeberg.org/zyachel/quetre)

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
