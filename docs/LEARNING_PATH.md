# Learning path

This app already works, so you can practise the skills developers use every day on real code. Do the stages in order. Each exercise is small, and most end with a pull request.

**The rule for every change, from Stage 1 onwards:**

```
Issue on GitHub → new branch from master → change → commit → push → PR → CI passes ✅ → merge → switch to master → pull
```

Tick the boxes as you go (edit this file on a branch and merge it, which is good practice too).

---

## Stage 0: Get it running

- [ ] Install [Node.js LTS](https://nodejs.org). Check with `node -v` in a terminal.
- [ ] In Visual Studio, open the project folder: **File → Open → Folder**.
- [ ] Open a terminal (**View → Terminal**) and run `npm install`, then `npm start`.
- [ ] Install **Expo Go** on your phone and scan the QR code. Search for your city.
- [ ] Run `npm test`. You should see all tests pass.

**You learned:** how a JavaScript project is installed and started.

---

## Stage 1: Git and GitHub workflow

### 1.1 Your first issue → PR
- [ ] On GitHub, open the **Issues** tab → **New issue**: "Change the app's background colour".
- [ ] Create a branch `feature/background-colour` from `master`.
- [ ] In `App.js`, change `backgroundColor: '#eef3fb'` in `styles.screen` to a colour you like.
- [ ] Commit, push, open a PR. Write `Closes #1` in the description (use your issue's number).
- [ ] Wait for the **CI** check to go green ✅, then merge. Notice the issue closed automatically.

### 1.2 Update a PR after review
- [ ] Open a PR for any small change (e.g. change the "Search" button text to "Go").
- [ ] Before merging, leave yourself a review comment in **Files changed** ("Use a clearer word").
- [ ] Make another commit on the **same branch** and push. Watch the PR update by itself. Then merge.

### 1.3 Cause a merge conflict on purpose
- [ ] From `master`, create branch `conflict-a`. Change the title `WeatherNow` in `App.js` to `Weather Today`. Commit and push.
- [ ] Switch back to `master`. Create branch `conflict-b`. Change the same title to `My Weather`. Commit and push.
- [ ] Open PRs for both. Merge `conflict-a`.
- [ ] The `conflict-b` PR now says **"This branch has conflicts"**. To fix it in Visual Studio:
  1. Switch to `master` and **Git → Pull** (so your laptop has the merged `conflict-a` change).
  2. Switch to `conflict-b`.
  3. **Git → Manage Branches** → right-click `master` → **Merge 'master' into 'conflict-b'**.
  4. Visual Studio reports a conflict in `App.js`. Open it in the merge editor, tick the title you want to keep, then click **Accept Merge**.
  5. Commit and push. The PR no longer has conflicts. Merge it.

**You learned:** issues, PR updates, CI checks, resolving conflicts.

---

## Stage 2: Debugging

### 2.1 Break a test and fix it
- [ ] In `src/utils/format.js`, change `(celsius * 9) / 5 + 32` to `(celsius * 5) / 9 + 32`.
- [ ] Run `npm test`. Read the failure: which test failed, what was **Expected** and what was **Received**?
- [ ] Undo the change and run the tests again.

### 2.2 Use the debugger
- [ ] Add `console.log('Searching for', query)` inside `handleSearch` in `App.js`. Search in the app and find the message in the terminal running `npm start`.
- [ ] Press `j` in that terminal to open the debugger. Set a breakpoint on the first line of `showWeather`, tap a city, and inspect the `city` variable.
- [ ] Remove the `console.log` before committing.

### 2.3 Test the error paths
- [ ] Turn on airplane mode and search. You should see a friendly error, not a crash. Find where that message comes from in `src/api/weather.js`.

**You learned:** reading error messages, logging, breakpoints.

---

## Stage 3: Terminal

Get comfortable running these yourself (in **View → Terminal**):

| Command | Meaning |
|---|---|
| `cd folder` / `cd ..` | Go into a folder / go up one folder |
| `dir` (Windows) or `ls` | List files |
| `git status` / `git log --oneline` | What changed / recent commits |
| `npm install` | Install packages listed in `package.json` |
| `npm test` / `npm run lint` | Run tests / check the code |

- [ ] Do the whole of exercise 1.1 again using only `git` commands in the terminal (no Visual Studio buttons).

---

## Stage 4: Packages

- [ ] Open `package.json`. Find `dependencies` (used by the app) and `devDependencies` (only used while developing, e.g. Jest).
- [ ] Run `npm outdated` to see which packages have newer versions.
- [ ] Learn the rule for this project: install Expo/React Native packages with `npx expo install <name>`, not `npm install`. It picks a version that works with your Expo SDK.
- [ ] Notice `package-lock.json`: it records the exact versions installed. Always commit it.

---

## Stage 5: Testing

- [ ] Read `__tests__/format.test.js` (simple) and `__tests__/App.test.js` (tests the screen like a user would).
- [ ] Run `npm test -- --coverage` and look at which lines are not tested.
- [ ] **Exercise:** add a `formatWindSpeed(kmh, unit)` function in `src/utils/format.js` that can show mph too, with tests for it, in a PR.

---

## Stage 6: APIs, data and deployment

### 6.1 Use more of the API: 3-day forecast
- [ ] Add a 3-day forecast below the weather card. In `src/api/weather.js`, add to the forecast URL:
  `&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3&timezone=auto`
- [ ] Try the URL in your browser first to see what JSON comes back.
- [ ] Add a test with a fake response, like the ones in `__tests__/weather.test.js`.

### 6.2 Add a new package: "Use my location"
- [ ] `npx expo install expo-location`
- [ ] Read the expo-location docs, ask for permission, get the phone's position, and show its weather.

### 6.3 Data storage
- [ ] Favourites are saved on the phone with AsyncStorage (`src/storage/favorites.js`). Read it and its tests.
- [ ] Stretch goal: save favourites to a cloud database (Supabase or Firebase) so they sync between phones.

### 6.4 Build a real installable app with EAS
- [ ] Create a free account at [expo.dev](https://expo.dev).
- [ ] `npx eas-cli@latest login`
- [ ] `npx eas-cli@latest build --profile preview --platform android`
- [ ] When it finishes, open the link on your Android phone and install the APK. This is your app without Expo Go.

---

## Stage 7: CI and security

- [ ] Open `.github/workflows/ci.yml` and read the comments. Open the **Actions** tab on GitHub to see past runs.
- [ ] Open a PR that breaks a test on purpose. Watch CI fail ❌ on the PR. Fix it and watch it pass.
- [ ] Protect `master`: **Settings → Rules → Rulesets** (or **Settings → Branches** on older layouts). Require a pull request and require the **CI** check to pass before merging.
- [ ] Turn on **Dependabot alerts** (**Settings → Code security**) so GitHub warns you about vulnerable packages.
- [ ] Copy `.env.example` to `.env`. Run `git status`: `.env` must **not** appear (it's in `.gitignore`). Read the warning in `src/config.js` about what is safe to put there.

---

## Stage 8: Working like a team

- [ ] Use a **GitHub Project board** (Projects tab → New project → Board): put issues in To do / In progress / Done.
- [ ] Before starting each issue, write down how long you think it will take. Compare afterwards. You'll get better at estimating.
- [ ] Fill in the PR template properly every time (it appears automatically when you open a PR).
- [ ] Ask a friend to review one of your PRs, or review someone else's open-source PR.

---

## Stage 9: Using AI tools well

- [ ] Ask Copilot or Claude to write the tests for the 3-day forecast. **Read every line** before committing. Can you explain what each test checks?
- [ ] Ask AI to explain a file you don't understand, then explain it back in your own words in a PR description.
- [ ] Rule: never commit code you can't explain.

---

## Feature ideas for later

- Hourly forecast for the next 24 hours
- Dark mode
- Pull down to refresh the weather
- Remember the last city you looked at
- Change the background colour based on the weather
