# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [8.0.0](https://github.com/zyachel/quetre/compare/v7.1.0...v8.0.0) (2024-04-07)


### ⚠ BREAKING CHANGES

* **search:** any search request will be responded with a 410

### Bug Fixes

* **parse:** don't bail out on encountering weird characters ([f11d3f2](https://github.com/zyachel/quetre/commit/f11d3f2ac641bce64c5a674c0995cf85ffc7e37e))
* remove stats from UI that aren't available anymore ([a0ac36a](https://github.com/zyachel/quetre/commit/a0ac36a174849a466c6b63ff65161e4627f1a56b))
* **search:** remove broken search route ([f49062d](https://github.com/zyachel/quetre/commit/f49062d44ac04c77c3f064e703f40a8e114b5776))

## [7.1.0](https://github.com/zyachel/quetre/compare/v7.0.0...v7.1.0) (2023-11-05)


### Features

* add docker support with redis([#118](https://github.com/zyachel/quetre/issues/118)) ([2320c6c](https://github.com/zyachel/quetre/commit/2320c6c4d5edc77f8c84f3a23fb1b807e7747325))
* **answers:** mark related questions that are unanswered ([f77a1b1](https://github.com/zyachel/quetre/commit/f77a1b15bfbbf395f47c107356942fc5d7186a45))


### Bug Fixes

* **fetcher:** fix answers route crashing in case there aren't any answers ([c6c4828](https://github.com/zyachel/quetre/commit/c6c4828422f3349cab72b76fd32448f1b5ab9b7e))
* fix a typo while modifying url ([7547f54](https://github.com/zyachel/quetre/commit/7547f54d7016a4b9f64b712522c92b8bd6f8ccaf))
* **search:** show search query along with results ([4cd5514](https://github.com/zyachel/quetre/commit/4cd551438b288841e41efea5e95cae02f1c27076))

## [7.0.0](https://github.com/zyachel/quetre/compare/v6.0.0...v7.0.0) (2023-04-23)


### ⚠ BREAKING CHANGES

* **answers:** old fetcher may or may not work

fix: https://github.com/zyachel/quetre/issues/101

### Features

* **cache:** increase ttl for routes that are cached but being accessed again ([10eea08](https://github.com/zyachel/quetre/commit/10eea0830511d0e914a255a05904ab18265e46e6))


### Bug Fixes

* **answers:** fix answers route crashing ([b8a0b9f](https://github.com/zyachel/quetre/commit/b8a0b9fcadd1d3c797b0023ff91b2221b9072298))
* fix flash of inaccurate color theme ([35a0d87](https://github.com/zyachel/quetre/commit/35a0d87c133ccda9242d319afa63a2c17a6df973))

## [6.0.0](https://github.com/zyachel/quetre/compare/v5.6.0...v6.0.0) (2023-03-04)


### ⚠ BREAKING CHANGES

* older versions will not work with answer route

fix https://github.com/zyachel/quetre/issues/96

### Bug Fixes

* change japanese code from ja to jp ([ef46c5e](https://github.com/zyachel/quetre/commit/ef46c5ee3aa51064bcfde1011578e7062a044a61))
* fix a couple of `NaN`s ([71587d0](https://github.com/zyachel/quetre/commit/71587d0db410eb506a1c9673ffa627a23b5cd4fa))
* fix broken answers feed ([677b846](https://github.com/zyachel/quetre/commit/677b846eb2ef0dc6475e92f9a6de1c9dff23e051))

## [5.6.0](https://github.com/zyachel/quetre/compare/v5.5.0...v5.6.0) (2023-02-11)


### Features

* implement caching of api responses ([175878d](https://github.com/zyachel/quetre/commit/175878dba9aaf23a09325842997658c01670efd3))

# [5.5.0](https://github.com/zyachel/quetre/compare/v5.4.0...v5.5.0) (2023-01-15)


### Bug Fixes

* fix outgoing url on error page ([595b720](https://github.com/zyachel/quetre/commit/595b720ee12b234a9454e470139a3a40b4ad600f))
* ui fixes for webkit-based browsers ([44229f8](https://github.com/zyachel/quetre/commit/44229f87027b1b15d38c2739b9d85bec40a36bd8))


### Features

* add redirection route ([4199bb3](https://github.com/zyachel/quetre/commit/4199bb38c379fa5e6c2c5e58098c63534c1743b5))



# [5.4.0](https://github.com/zyachel/quetre/compare/v5.3.0...v5.4.0) (2023-01-07)


### Bug Fixes

* **routes:** add unimplemented error message to `space` route ([8820f36](https://github.com/zyachel/quetre/commit/8820f36af80f29d861a47526538293357e7c32f3))


### Features

* **lang:** add ability to choose language in search route ([cca6f69](https://github.com/zyachel/quetre/commit/cca6f69deda235fa87416e28a4dd557698974e3d))



# [5.3.0](https://github.com/zyachel/quetre/compare/v5.2.0...v5.3.0) (2023-01-07)


### Features

* add support for other languages ([d16ae48](https://github.com/zyachel/quetre/commit/d16ae48dcb762af6d0888b6fc556a04a4c954549))



# [5.2.0](https://github.com/zyachel/quetre/compare/v5.1.1...v5.2.0) (2022-11-27)


### Features

* self hosted mathjax ([30d06dc](https://github.com/zyachel/quetre/commit/30d06dc0ffa1b0b362952a16ebdccc9ec2b804b9))



## [5.1.1](https://github.com/zyachel/quetre/compare/v5.1.0...v5.1.1) (2022-10-30)


### Bug Fixes

* fix accidental console.log statement in template ([f719b3c](https://github.com/zyachel/quetre/commit/f719b3c4c91c504db35d1077bd05aa149b0f42db))
