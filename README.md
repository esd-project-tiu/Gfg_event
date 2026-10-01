<div align="center">

# DEVFIX

### From cryptic errors to clear solutions.

Paste a programming error. Get a plain-English explanation, the likely causes, and a fix you can adapt, all in your browser.

![Status](https://img.shields.io/badge/status-MVP-10b981?style=flat-square)
![Runs](https://img.shields.io/badge/runs-100%25%20in%20browser-10b981?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-none-10b981?style=flat-square)
![Build](https://img.shields.io/badge/build%20step-none-10b981?style=flat-square)
![Languages](https://img.shields.io/badge/languages-JS%20%7C%20Python%20%7C%20Java%20%7C%20C%2B%2B-informational?style=flat-square)

</div>

---

## Table of contents

- [What is DEVFIX?](#what-is-devfix)
- [Why it exists](#why-it-exists)
- [Quick start](#quick-start)
- [Features](#features)
- [Supported errors](#supported-errors)
- [How it works](#how-it-works)
- [Privacy and security](#privacy-and-security)
- [Accessibility](#accessibility)
- [Project structure](#project-structure)
- [Adding your own rule](#adding-your-own-rule)
- [Deploying](#deploying)
- [MVP scope](#mvp-scope)
- [Roadmap](#roadmap)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

---

## What is DEVFIX?

DEVFIX is a **developer error analyzer** delivered as a single `index.html` file. You paste an error message or stack trace, pick a language, and DEVFIX matches it against a library of known error patterns. It then explains what happened, why it probably happened, how to fix it, and how to avoid it next time.

There is no backend, no account, no API key and no build step. Open the file and it works.

> **Honest by design.** DEVFIX is a rule-based matcher, not an AI. When it does not recognize an error, it says so and offers general debugging steps. It never invents a diagnosis.

---

## Why it exists

Error messages are written for compilers, not for people. A beginner sees `Cannot read properties of undefined` and has no idea where to look. An experienced developer still loses time to a half-remembered `undefined reference` linker error.

DEVFIX turns each message into four things you can act on:

| You see | DEVFIX tells you |
|---|---|
| A cryptic error | **What happened**, in plain English |
| A stack trace | **Why it might have happened**, as a ranked list of causes |
| A blank editor | **How to fix it**, as numbered steps plus before/after code |
| The same bug next week | **How to prevent it** |

---

## Quick start

**Option 1: open the file**

```bash
# Just double-click index.html, or:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

**Option 2: serve it locally** (recommended, so copy buttons and share links behave exactly as they do when hosted)

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

**Try it in 10 seconds**

1. Click a chip under **Try a sample**, for example *JS undefined property*.
2. Click **Analyze error** (or press `Ctrl`/`⌘` + `Enter`).
3. Read the result, switch between the **Before / After / What changed?** tabs, and copy what you need.

---

## Features

### Core analysis

- **Plain-English explanations.** Every known error gets a clear "What happened?" section.
- **Likely causes.** A short list of the most common reasons the error occurs.
- **Step-by-step fix.** Numbered, actionable steps rather than a wall of text.
- **Prevention advice.** One practical habit that stops the error from coming back.
- **Rule-based and deterministic.** The same input always gives the same output.
- **Honest fallback.** Unrecognized errors are labeled **General guidance** (not **Known pattern**) and receive a universal debugging checklist instead of a guess.

### Fix Lens

An interactive before/after viewer attached to most rules (29 of 33).

- **Three tabs:** `Before`, `After`, and `What changed?`
- **Changed lines are highlighted** with `−` and `+` markers, like a diff.
- **Syntax highlighting** for keywords, strings, numbers and comments, in both themes.
- **Per-tab copy button** (copy the broken code, the fixed code, or the explanation).
- **Full keyboard support** for the tabs (arrow keys, Home, End).
- Every example is clearly labeled *illustrative*, because it shows the idea, not a drop-in patch for your code.

### Debugging Detective

For the trickiest errors, DEVFIX asks one or two short multiple-choice questions, such as *"Where does the undefined value come from?"* and *"When does it fail?"*, then gives you tailored next steps based on your answers.

Available for: JavaScript undefined/null property access, Java `NullPointerException`, C++ segmentation faults, and the Python generic `TypeError`.

### Context-aware clues

Paste your source code into the optional context box and DEVFIX will use it to give targeted hints (it never runs or fully parses your code):

- **Line pointer.** Reads the line number from the traceback (`line 3`, `app.js:3:48`, `Main.java:4`) and shows you that exact line from your snippet.
- **Property tracking.** For `Cannot read properties of undefined (reading 'name')`, it finds where `.name` appears in your code.
- **Declaration check.** For `NameError` and `ReferenceError`, it tells you whether the missing name is declared anywhere in your snippet, or probably a typo or missing import.
- **Python-aware.** Handles Python tracebacks correctly, where the innermost frame is last.

### Smart language handling

- **Language selector** for JavaScript, Python, Java, C++ and Other.
- **Automatic mismatch detection.** If you paste a Python traceback while JavaScript is selected, DEVFIX notices and offers a one-click **Switch to Python** button.
- **Cross-language hint** on unrecognized errors that look like they belong to another language's rule set.

### Sharing and copying

- **Copy explanation** copies the whole analysis as clean plain text.
- **Copy fix** copies the steps and the corrected example.
- **Copy share link** creates a URL like `#lang=python&err=...`. Anyone who opens it lands directly on the analysis.
- **Share-link safety.** A visible reminder to remove file paths, tokens and secrets. Links are capped at 4,000 characters of error text.
- **Clipboard fallback** for older browsers and non-secure contexts.

### Polish and usability

- **Dark and light themes.** Follows your OS setting by default, with a manual toggle that is remembered between visits.
- **Five one-click samples** so you can see the product work immediately.
- **Keyboard shortcut:** `Ctrl`/`⌘` + `Enter` runs the analysis.
- **Stale-result warning.** If you edit your input after analyzing, the old result dims and a banner reminds you to re-run it, so you never act on an outdated answer.
- **Responsive layout** from phone to desktop.
- **Reduced-motion support.** Animations switch off if your system asks for it.
- **Input safety.** Long inputs are trimmed to 20,000 characters, line endings and byte-order marks are normalized.

---

## Supported errors

**33 rules** across four languages. Rules are checked top to bottom, so specific patterns always win over generic ones.

### JavaScript (8)

| Error | Fix Lens | Detective |
|---|:--:|:--:|
| `TypeError`: property access on `undefined` | ✅ | ✅ |
| `TypeError`: property access on `null` | ✅ | ✅ |
| `SyntaxError`: JSON expected, HTML received | ✅ | |
| `ReferenceError`: used before initialization (temporal dead zone) | ✅ | |
| `ReferenceError`: name is not defined | ✅ | |
| `TypeError`: value is not a function | ✅ | |
| `RangeError`: Maximum call stack size exceeded | ✅ | |
| `SyntaxError` (generic) | ✅ | |

### Python (14)

| Error | Fix Lens | Detective |
|---|:--:|:--:|
| `IndentationError` | ✅ | |
| `ModuleNotFoundError` | | |
| `ZeroDivisionError` | ✅ | |
| `AttributeError`: `NoneType` has no attribute | ✅ | |
| `AttributeError` | ✅ | |
| `TypeError`: incompatible types in an operation | ✅ | |
| `TypeError`: wrong arguments in a call | ✅ | |
| `TypeError`: object is not callable | ✅ | |
| `TypeError`: does not support indexing or iteration | ✅ | |
| `TypeError` (generic) | | ✅ |
| `NameError` | ✅ | |
| `KeyError` | ✅ | |
| `IndexError` | ✅ | |
| `SyntaxError` (generic) | ✅ | |

### Java (5)

| Error | Fix Lens | Detective |
|---|:--:|:--:|
| `NullPointerException` | ✅ | ✅ |
| `ArrayIndexOutOfBoundsException` | ✅ | |
| `ClassNotFoundException` | | |
| `NumberFormatException` | ✅ | |
| `StackOverflowError` | ✅ | |

### C++ (6)

| Error | Fix Lens | Detective |
|---|:--:|:--:|
| Segmentation fault | ✅ | ✅ |
| Linker error: undefined reference | | |
| Compiler error: expected `;` | ✅ | |
| Compiler error: no matching function | ✅ | |
| Compiler error: type conversion | ✅ | |
| `std::out_of_range` | ✅ | |

### Everything else

Any other language, or any error DEVFIX does not recognize, returns **General guidance**: a language-agnostic debugging checklist (read the full message, find the failing line, reproduce it minimally, check inputs and return values) with no pretend diagnosis.

---

## How it works

```
 ┌──────────────┐    ┌───────────────┐    ┌────────────────┐    ┌──────────────┐
 │ Paste error  │ -> │  Normalize    │ -> │ Match rules    │ -> │ Render       │
 │ + language   │    │ (trim, EOLs,  │    │ for language,  │    │ result card  │
 │ (+ code)     │    │  20k cap)     │    │ first hit wins │    │ + Fix Lens   │
 └──────────────┘    └───────────────┘    └───────┬────────┘    └──────────────┘
                                                   │
                                    ┌──────────────┴──────────────┐
                                    │ Rule hints add clues from   │
                                    │ your code (line, property,  │
                                    │ declaration check)          │
                                    └─────────────────────────────┘
```

1. **Normalize.** Strip BOMs, unify line endings, trim, cap at 20,000 characters.
2. **Match.** Walk the rule list for the selected language. Each rule is a regular expression. The first match wins, so specific rules sit above generic ones.
3. **Enrich.** The matched rule's `hint()` function and the line-number extractor add clues from your optional source snippet.
4. **Render.** The result is built with DOM APIs (`textContent` only), then focused and announced to screen readers.
5. **No match?** Return the honest general-guidance result, with a language-mismatch note if another language's rule matches.

### Tech

| | |
|---|---|
| Language | Vanilla HTML, CSS and JavaScript |
| Files | 1 (`index.html`) |
| Dependencies | None |
| Network calls | None |
| Storage | `localStorage` for the theme preference only |

---

## Privacy and security

- **Nothing is uploaded.** All analysis happens locally in your browser. There is no server to send data to.
- **No tracking, no analytics, no cookies.**
- **XSS-safe rendering.** All user text is inserted with `textContent`, never `innerHTML`.
- **Code is never executed.** The context box is read as plain text. DEVFIX does not run, evaluate or fully parse it.
- **Share links contain your error text.** The URL hash stays in the browser and is not sent to servers when you open it, but anyone you send the link to will see the text. Remove file paths, tokens and secrets first. DEVFIX reminds you on every result.

---

## Accessibility

DEVFIX is built to be usable without a mouse or a screen.

- Skip link to jump straight to the analyzer
- Properly labeled form fields with inline, `aria-invalid` error messages
- Results receive focus and are announced through a live region
- Fix Lens implements the ARIA tabs pattern with arrow-key navigation
- Detective questions are real `fieldset` and radio groups
- Visible focus rings on every interactive element
- Both themes designed for readable contrast
- `prefers-reduced-motion` respected

---

## Project structure

```
devfix/
├── index.html      # The entire app: markup, styles, rules and logic
└── README.md       # You are here
```

Inside `index.html`, the script is organized in clear sections:

| Section | Purpose |
|---|---|
| `RULES` | The error pattern library (data, not logic) |
| `GENERAL_STEPS` | Fallback debugging checklist |
| `SAMPLES` | One-click demo inputs |
| DOM helpers | Safe element builders |
| Analysis | `normalize`, `findRule`, `lineHint`, `buildResult` |
| Rendering | `render`, `buildFixLens`, `buildDetective`, token highlighter |
| Language detection | `DETECT` scoring table and mismatch hint |
| Share links | `buildShareUrl`, `loadFromHash` |
| Theme | Toggle and persistence |

---

## Adding your own rule

Rules are plain objects. Add one to the `RULES` array in `index.html`, **above** any generic rule for the same language.

```js
{
  id: "py-file-not-found",
  lang: "python",
  match: /FileNotFoundError: \[Errno 2\] No such file or directory: '([^']+)'/i,
  name: "FileNotFoundError",
  summary: "Python could not find the file you asked it to open.",
  what: "Your code tried to open a file at a path that does not exist from where the program is running.",
  causes: [
    "The filename or path has a typo.",
    "The program runs from a different working directory than you expect.",
    "The file was moved, renamed or never created."
  ],
  fix: [
    "Print the path you are opening and confirm it is what you expect.",
    "Print `os.getcwd()` to see the directory Python is running from.",
    "Use an absolute path, or build one with `pathlib.Path(__file__).parent`."
  ],
  // Fix Lens: all three are required for the lens to appear
  beforeCode: "with open('data.csv') as f:\n    print(f.read())",
  afterCode: "from pathlib import Path\n\npath = Path(__file__).parent / 'data.csv'\nwith open(path) as f:\n    print(f.read())",
  changeExplanation: "The Before code depends on the current working directory. The After code builds the path from the script's own location.",
  prevent: "Build file paths from a known base directory instead of relying on the working directory.",
  // Optional: return a string of extra clues, or null
  hint: function (m, ctx) {
    return "The missing file is `" + m[1] + "`.";
  }
}
```

**Rule checklist**

- [ ] `id` is unique and follows `lang-short-name`
- [ ] `match` is specific enough not to swallow neighbouring errors
- [ ] Placed above any `generic: true` rule for the same language
- [ ] `beforeCode`, `afterCode` and `changeExplanation` all present (or all omitted)
- [ ] Explanations are short, plain and honest about uncertainty
- [ ] Optional `detective` has at most 2 questions

---

## Deploying

DEVFIX is a static file, so any static host works. No build, no config.

| Host | How |
|---|---|
| **GitHub Pages** | Push `index.html`, then Settings → Pages → deploy from branch |
| **Netlify / Vercel / Cloudflare Pages** | Drag and drop the folder, or connect the repo |
| **Any web server** | Copy `index.html` to the web root |
| **Offline** | Keep the file on your machine and open it |

> Share links only work for other people once DEVFIX is hosted at a real URL. From a `file://` path, DEVFIX will tell you this when you copy a link.

---

## MVP scope

This release is intentionally small and complete. The goal of the MVP is to prove one thing: **a developer can paste an error and understand it in under a minute.**

### In the MVP

- [x] Paste error + choose language + analyze
- [x] Plain-English explanation, causes, fix and prevention
- [x] 33 rules covering JavaScript, Python, Java and C++
- [x] Fix Lens (before / after / what changed)
- [x] Debugging Detective for the hardest errors
- [x] Optional source context with line, property and declaration hints
- [x] Language mismatch detection with one-click switch
- [x] Copy explanation, copy fix, copy share link
- [x] Honest general-guidance fallback
- [x] Dark / light theme with persistence
- [x] Keyboard shortcut, samples, stale-result warning
- [x] Accessible, responsive, zero-dependency, fully local

### Deliberately not in the MVP

- AI or LLM-generated answers (kept out so results stay deterministic and private)
- Accounts, history or cloud sync
- Running or fully parsing your code
- Languages beyond the four above

---

## Roadmap

Ideas for after the MVP, roughly in order of value. These are proposals, not commitments.

**Next**
- [ ] More rules: Go, Rust, TypeScript, C#, PHP, SQL
- [ ] More Python and Java rules (`FileNotFoundError`, `ValueError`, `ConcurrentModificationException`, `ClassCastException`)
- [ ] Framework errors: React hydration, Node `EADDRINUSE`, Django, Spring
- [ ] Stack-trace parsing that highlights *your* frames and dims library frames

**Later**
- [ ] Local history of past analyses (stored only in the browser)
- [ ] Export result as Markdown
- [ ] Rule tests: a fixture per rule to guard against regressions
- [ ] Installable PWA with full offline support
- [ ] Browser extension and a VS Code extension
- [ ] Optional, opt-in AI explanations for unrecognized errors, clearly labeled and separate from the rule-based answer
- [ ] Community-contributed rule packs

---

## Known limitations

- **It matches patterns, so it can be wrong.** The exact cause always depends on your code. Treat every result as a strong lead, then confirm against the line the error points to.
- **Coverage is finite.** 33 rules will not cover every error. Unrecognized errors get general guidance by design.
- **Context hints are simple.** They assume your snippet starts at line 1 of the file and use text matching, not a real parser.
- **Examples are illustrative.** Before/after code shows the idea and is not a drop-in patch.
- **Share links carry your text.** Be careful what you put in them.

---

## Contributing

Contributions are welcome, and rules are the easiest way in.

1. Fork the repo and create a branch.
2. Add or improve a rule in `RULES` (see [Adding your own rule](#adding-your-own-rule)).
3. Test it by loading a real error for that language and checking the result in both themes.
4. Open a pull request describing the error you covered and where it came from.

**Guiding principles**

- Be **honest** about uncertainty. Never present a guess as a diagnosis.
- Be **plain**. Prefer simple words to jargon.
- Be **local**. No network calls, no tracking.
- Be **accessible**. Keyboard and screen-reader support are not optional.
- Stay **dependency-free**.

---

## License

Add your license here (MIT is a common choice for a project like this).

---

<div align="center">

**DEVFIX**: understand your errors, fix them faster.

*Explanations are educational suggestions from a rule-based matcher. Always validate them against your actual code.*

</div>
