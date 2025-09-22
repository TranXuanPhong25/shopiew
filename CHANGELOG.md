## [0.5.0](https://github.com/TranXuanPhong25/shopiew/compare/v0.4.1...v0.5.0) (2025-09-21)

### 🚀 Features

* add custom loader animation to loading component ([2e25ba5](https://github.com/TranXuanPhong25/shopiew/commit/2e25ba52126a97695a7f720f67e05c71f93be639))

## [0.4.1](https://github.com/TranXuanPhong25/shopiew/compare/v0.4.0...v0.4.1) (2025-09-21)

### 🐛 Bug Fixes

* useCallback and missing deps error ([9e972d1](https://github.com/TranXuanPhong25/shopiew/commit/9e972d1a238f11a171ddd25c0ba0cc8911ef6f88))

### 🔨 Technical Changes

* refactor ChatWidget component and update import paths ([f7f4dce](https://github.com/TranXuanPhong25/shopiew/commit/f7f4dcebdb506d8dc5e61cbab6990e6712019c00))

## [0.4.0](https://github.com/TranXuanPhong25/shopiew/compare/v0.3.0...v0.4.0) (2025-09-21)

### 🚀 Features

* add demo page and enhanced features section with animations and responsive design ([6aa9de1](https://github.com/TranXuanPhong25/shopiew/commit/6aa9de1333baee90764c6ebc7e38196d1578f666))
* add Orb component with GLSL shader effects and integrate into landing section ([ae61c2c](https://github.com/TranXuanPhong25/shopiew/commit/ae61c2c264aeafe19d241ca5cb9edef5adc47c26))
* add zoom effect demo with multiple animation types and center points ([0f7d46c](https://github.com/TranXuanPhong25/shopiew/commit/0f7d46c08ab3be5c9bd4cf2b9d8b6672e29e38ad))
* auto scroll to new message ([dc4e3c9](https://github.com/TranXuanPhong25/shopiew/commit/dc4e3c9e73517e09da7493c65c67c4c1edb09ad4))
* Implement product detail page with breadcrumb navigation, product images, specifications, and customer reviews ([92cd290](https://github.com/TranXuanPhong25/shopiew/commit/92cd29052ac568547889e4457a84b2b90e862efc))

### 🐛 Bug Fixes

* Correct type assertion for message parts in AIChatInterface ([74e7034](https://github.com/TranXuanPhong25/shopiew/commit/74e7034c162a833fdc4a4c925b42665214bb2664))
* redirect to dashboard after login successfully ([4e41d4a](https://github.com/TranXuanPhong25/shopiew/commit/4e41d4a93b855311d05baacf23845879f7098f2e))

### 🔨 Technical Changes

* actively logout button ([2ef8b99](https://github.com/TranXuanPhong25/shopiew/commit/2ef8b9907de028e2cb80581670d4424c266e9abb))
* Simplify AIChatInterface by removing unnecessary props and improving message handling ([50af68d](https://github.com/TranXuanPhong25/shopiew/commit/50af68dd66621defc8d634ddf1edcb49a204a54e))

## [0.3.0](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.6...v0.3.0) (2025-09-17)

### 🚀 Features

* Implement shop creation flow with multi-step form ([c8d72cc](https://github.com/TranXuanPhong25/shopiew/commit/c8d72cc36a323bdf294cc634cd54f66129d3e1d6))
* shop creation integrated ([a69f090](https://github.com/TranXuanPhong25/shopiew/commit/a69f090b35b564717ca0ba9f316012d5848d5a08))

### 🐛 Bug Fixes

* build errors fixed ([780f007](https://github.com/TranXuanPhong25/shopiew/commit/780f007b23bafa24a2883586948b9fe2365a4b12))
* shop creation needed constraint ([f80f912](https://github.com/TranXuanPhong25/shopiew/commit/f80f9122c1137839e4f43a1e606c8c45202cf8eb))

### 🔨 Technical Changes

* auto deploy @shopiew/main to docker hub then azure auto deploy from that image ([a1489a7](https://github.com/TranXuanPhong25/shopiew/commit/a1489a7690a2f636be99f8ba58e99e77c72516c7))
* fix the pnpm symlink ([1dad1fe](https://github.com/TranXuanPhong25/shopiew/commit/1dad1fe23b766689d56ee012b6b92c8ba20b11ef))
* fix the pnpm symlink ([ab21cb8](https://github.com/TranXuanPhong25/shopiew/commit/ab21cb8782b202bc5879371942b67d76085667f5))
* fix the pnpm symlink ([c6d0d14](https://github.com/TranXuanPhong25/shopiew/commit/c6d0d149e5231efc0eaf5ec6d33962c24210e8b3))
* move shop creation page ([4ddf792](https://github.com/TranXuanPhong25/shopiew/commit/4ddf792f5da7ddf4f67a859aac992d130b2f6352))
* store imports and restructure store files ([f9b64a9](https://github.com/TranXuanPhong25/shopiew/commit/f9b64a9051cc5ed27c5bd6472c58f3f7a8a8fde7))
* update shop route references and create new shop page ([926b802](https://github.com/TranXuanPhong25/shopiew/commit/926b802a1a527a7941c9e64bb9afadbb72ae81f2))
* upload logo and banner when submit ([f5a1919](https://github.com/TranXuanPhong25/shopiew/commit/f5a191902b446ca2e40437d775e3eacf8a3de418))

## [0.2.6](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.5...v0.2.6) (2025-08-22)

### 🐛 Bug Fixes

* update deployment package path to point to standalone build ([2428a67](https://github.com/TranXuanPhong25/shopiew/commit/2428a67bf97b28a873992c6d5d96a76871190573))

### 🔨 Technical Changes

* simplify workflow by removing unused permissions and artifact steps ([f0314e8](https://github.com/TranXuanPhong25/shopiew/commit/f0314e82f95a8d462c77d6abf3926bc3e5c4ed12))

## [0.2.5](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.4...v0.2.5) (2025-08-22)

### 🐛 Bug Fixes

* build standalone instead ([440b265](https://github.com/TranXuanPhong25/shopiew/commit/440b265d37e4cded988ac72f7657059e16d7938f))

## [0.2.4](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.3...v0.2.4) (2025-08-22)

### 🐛 Bug Fixes

* update Node.js setup and pnpm action version in workflow ([fd7b28b](https://github.com/TranXuanPhong25/shopiew/commit/fd7b28b1671fbd5e89895a99df188ab6a3c1d287))

## [0.2.3](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.2...v0.2.3) (2025-08-22)

### 🐛 Bug Fixes

* correct cache syntax in Node.js setup step ([b71893e](https://github.com/TranXuanPhong25/shopiew/commit/b71893e184856e647e2f74a79e3703052fc16b69))

## [0.2.2](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.1...v0.2.2) (2025-08-22)

### 🐛 Bug Fixes

* move to main package before bulid ([556d82d](https://github.com/TranXuanPhong25/shopiew/commit/556d82da7b6890e109e41ba9cbcc19313c0a2200))

## [0.2.1](https://github.com/TranXuanPhong25/shopiew/compare/v0.2.0...v0.2.1) (2025-08-22)

### 🐛 Bug Fixes

* remove .env ([e6236da](https://github.com/TranXuanPhong25/shopiew/commit/e6236da4da8032255fb3d72a0a3231349d15b58a))

## [0.2.0](https://github.com/TranXuanPhong25/shopiew/compare/v0.1.1...v0.2.0) (2025-08-22)

### 🚀 Features

* add Copilot onboarding instructions for Shopiew repository ([66448f3](https://github.com/TranXuanPhong25/shopiew/commit/66448f31dd19bf3a134ac0ef12cc489cb9839cd6))
* integrated admin ([61f8051](https://github.com/TranXuanPhong25/shopiew/commit/61f8051d29ec881f430f428fa5943b2bce9d07b4))
* **main:** main package integrated ([3852c9b](https://github.com/TranXuanPhong25/shopiew/commit/3852c9bf29e6d74c3405d490b878db93625a3e15))
* **seller:** integrated ([7ebaa43](https://github.com/TranXuanPhong25/shopiew/commit/7ebaa4314fe2ce9add3bdd3cea9f9a1855de4b0d))
* update Copilot onboarding instructions to include design guidelines ([2e8929e](https://github.com/TranXuanPhong25/shopiew/commit/2e8929e4c5fa942fff98cdabc128a4fb87a3fa0b))

### 🐛 Bug Fixes

* build errors ([dc5ef55](https://github.com/TranXuanPhong25/shopiew/commit/dc5ef55c69a1253566fd3e3764cf381642636835))

## [0.1.1](https://github.com/TranXuanPhong25/shopiew/compare/v0.1.0...v0.1.1) (2025-08-22)

### 🐛 Bug Fixes

* correct repo release ([b237500](https://github.com/TranXuanPhong25/shopiew/commit/b237500fce3c0b74520fc163d6dc06c838ab8766))
