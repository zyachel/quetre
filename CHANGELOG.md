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



# [1.1.0](https://github.com/zyachel/quetre/compare/v1.0.3...v1.1.0) (2022-05-22)


### Bug Fixes

* fix a bug related to fetcher.js ([6ad2269](https://github.com/zyachel/quetre/commit/6ad2269951bb6c72a464f22b6aa428ce84622e94))


### Features

* **route:** add new route ([0a35cda](https://github.com/zyachel/quetre/commit/0a35cdaa157d22dac4ac7b58d8ba9b6cd2553b31))



## [1.0.3](https://github.com/zyachel/quetre/compare/v1.0.2...v1.0.3) (2022-05-21)


### Bug Fixes

* **answer:** reduce line-height in answers ([1447ce6](https://github.com/zyachel/quetre/commit/1447ce65b582a4894773d5e062f37bfbbc9e8909)), closes [fix#1](https://github.com/fix/issues/1)
* make the background of code paragraphs more promient in light mode ([64dfcae](https://github.com/zyachel/quetre/commit/64dfcae88dfe3f7df87b9f9d76a37ce58581c882))



## [1.0.2](https://github.com/zyachel/quetre/compare/v1.0.1...v1.0.2) (2022-05-20)


### Bug Fixes

* fix some more formatting issues ([066f040](https://github.com/zyachel/quetre/commit/066f040eb489d3075cbcccb9cce22b59f146c247))



## [1.0.1](https://github.com/zyachel/quetre/compare/ab335afb6a202396b57882cb9dc8c159d584e654...v1.0.1) (2022-05-20)


### Bug Fixes

* **favicon:** change favicons ([ab335af](https://github.com/zyachel/quetre/commit/ab335afb6a202396b57882cb9dc8c159d584e654))
* fix formatting issues ([24f18d6](https://github.com/zyachel/quetre/commit/24f18d67377d63829b48a465be8e024079ba809e)), closes [#1](https://github.com/zyachel/quetre/issues/1)



