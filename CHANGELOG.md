# [3.2.0](https://github.com/zyachel/quetre/compare/v3.0.0...v3.2.0) (2022-07-22)


### Features

* proxy images ([fa0a5f1](https://github.com/zyachel/quetre/commit/fa0a5f1fa526d6350e3321a34f9c5b326fd6d9bb))


### Reverts

* Revert "Propose code of conduct (Contributor Covenant) (#1)" (#2) ([436d08d](https://github.com/zyachel/quetre/commit/436d08de6dee2ecdeb67f0b707842e004fe9accb)), closes [#1](https://github.com/zyachel/quetre/issues/1) [#2](https://github.com/zyachel/quetre/issues/2)



# [3.0.0](https://github.com/zyachel/quetre/compare/v2.1.0...v3.0.0) (2022-06-24)


### Bug Fixes

* **fetcher:** fix fetcher logic ([fb7d803](https://github.com/zyachel/quetre/commit/fb7d8034fe98b21c69e1bf5eee4f3c85a2f94215))
* send a meaningful error response in case an answer/topic can't be fetched ([e7c83bd](https://github.com/zyachel/quetre/commit/e7c83bd06e9398575a46f1a3893f355f2147c157))


### BREAKING CHANGES

* **fetcher:** Quora changed their HTML. Previous fetcher logic won't work!

fix https://github.com/zyachel/quetre/issues/10



# [2.1.0](https://github.com/zyachel/quetre/compare/v2.0.1...v2.1.0) (2022-06-20)


### Bug Fixes

* change the code so as to compress static resources as well ([ad01448](https://github.com/zyachel/quetre/commit/ad014480ea648ec69a5d2ab3abbe8f133bd7a0c7))
* fix errors in fetchers ([b9d65e8](https://github.com/zyachel/quetre/commit/b9d65e89f0daefffc4656c7347842402633c51a2))
* fix footer styles in about page ([53c708a](https://github.com/zyachel/quetre/commit/53c708a1660b94f39e87f0d0e40584282964b850))


### Features

* add link to redirect user to Quora in case of errors ([2dd4a03](https://github.com/zyachel/quetre/commit/2dd4a030d2b2abfff81d06df6ab51b71175b4dd1))
* add meta tags for seo ([14eece7](https://github.com/zyachel/quetre/commit/14eece71a6e3f8179a98f6da14fd3aae0ba51dbf))
* add theme sensitive theme-color meta tags ([719988c](https://github.com/zyachel/quetre/commit/719988c587443f73d9ce4a58e6d4adba4e877220))



## [2.0.1](https://github.com/zyachel/quetre/compare/v2.0.0...v2.0.1) (2022-06-06)


### Bug Fixes

* **favicon:** change favicons to have transparent background ([2cb84f5](https://github.com/zyachel/quetre/commit/2cb84f5a6be5e23c570db5aebb580c7f1b3b2da7)), closes [#5](https://github.com/zyachel/quetre/issues/5)


### Performance Improvements

* implement caching for static assets ([475fc79](https://github.com/zyachel/quetre/commit/475fc79cec7f32b2fbce5bca19f84a6040958750))



# [2.0.0](https://github.com/zyachel/quetre/compare/v1.1.0...v2.0.0) (2022-05-25)


### Bug Fixes

* change status code of routes not implemented to 501 ([04fa753](https://github.com/zyachel/quetre/commit/04fa75362380ffbcaeb11150b0d4dfe015213b13))
* **fetcher:** fix fetcher scraping logic ([b11ceb4](https://github.com/zyachel/quetre/commit/b11ceb4c33b570a643758ed9c2b78e2b9730e9cd))
* **fetcher:** send correct error response when a malinformed answer url is accessed ([a9ae36e](https://github.com/zyachel/quetre/commit/a9ae36e26407b5e7779dbe3a256a7be5078a84d1))
* **robots.txt:** disallow all robots ([75c6c38](https://github.com/zyachel/quetre/commit/75c6c3877ac2c3dd53ec2959357fe5de2cc539e9))
* send appropriate response in case Quora rate limits the instance ([e8a51f6](https://github.com/zyachel/quetre/commit/e8a51f622405575e69a379bf5aaff091f56dafee))


### Performance Improvements

* implement lazy loading of images ([c0b89ba](https://github.com/zyachel/quetre/commit/c0b89ba2c36b63754f467b2ae0b6c82b5742b5bc))


### BREAKING CHANGES

* **fetcher:** old fetcher.js won't work as quora changed their html



