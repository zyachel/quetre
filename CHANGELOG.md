## [3.1.1](https://github.com/zyachel/quetre/compare/v3.1.0...v3.1.1) (2022-07-22)


### Bug Fixes

* browser theme preference not being respected when js is enabled ([40668b9](https://github.com/zyachel/quetre/commit/40668b92b5aa5c1b10cb265dc781066320cccce8))



# [3.1.0](https://github.com/zyachel/quetre/compare/v3.0.0...v3.1.0) (2022-07-22)


### Features

* proxy images ([fa0a5f1](https://github.com/zyachel/quetre/commit/fa0a5f1fa526d6350e3321a34f9c5b326fd6d9bb))



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



