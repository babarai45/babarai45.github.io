# Muhammad Babar — Premium 3D & Interactive AI Developer Portfolio

A responsive, high-graphics, and animated developer portfolio that functions as a professional CV. Built with a modern dark-cyber glassmorphism theme, this site highlights academic projects, research directions, and technical credentials.

🔗 **Live Portfolio:** [https://babar-xagi.github.io/](https://babar-xagi.github.io/)

---

## 🚀 Key Features

*   **Interactive 3D Background Canvas:** A custom-built, lightweight mathematical particle constellation network that floats in 3D volume and shifts perspective (parallax) dynamically based on cursor movement.
*   **Simulated AI Agent Terminal:** A terminal widget simulating a LangChain database agent (powered by Groq/Gemini). Visitors can select query presets or type questions to instantly fetch detailed summaries of Babar's final year project, work history, skills, and goals.
*   **3D Card Parallax Tilt:** Micro-interactions built using JavaScript that tilt profile and project cards in 3D perspective based on mouse hover coordinates, with a custom dynamic spotlight radial shine.
*   **Theme Accent Customizer:** A floating color dot palette switcher enabling visitors to cycle the glow animations and accents between **Cyber Cyan**, **Neon Purple**, and **Emerald Green** in real-time.
*   **Interactive Skills Pane & Timelines:** Skills categorized by focus area with animatable progress rating bars, along with responsive timeline layouts for education history and industry experience.
*   **Print-Optimized CV Engine (`@media print`):** Pressing `Ctrl + P` (or printing the page) automatically triggers a custom stylesheet layout that hides all digital interactions (canvas, buttons, terminal, switchers) and formats the entire portfolio into a clean, professional, two-page paper resume.

---

## 🛠️ Tech Stack & Resources

*   **Core Structure:** HTML5 (semantic layout)
*   **Styling System:** Vanilla CSS3 (custom CSS variables, responsive design clamp functions, keyframe animations, `@media print` queries)
*   **Logic Engine:** Vanilla ES6 JavaScript (HTML5 Canvas 2D Context, Intersection Observer, Lerp cursor math, Clipboard API)
*   **Typography:** Google Fonts (*Outfit* for clean display headings, *JetBrains Mono* for technical/terminal tags)
*   **Iconography:** FontAwesome Free (CDN link integration)

---

## 💻 Local Setup & Deployment

1.  Clone this repository locally:
    ```bash
    git clone https://github.com/babar-xagi/babar-xagi.github.io.git
    cd babar-xagi.github.io
    ```
2.  Open the `index.html` file in any modern web browser to view the portfolio locally.
3.  Deploy updates: Since this is a static webpage, pushing changes to the `main` branch will automatically update your site via GitHub Pages:
    ```bash
    git add .
    git commit -m "Upgrade portfolio to 3D interactive CV"
    git push origin main
    ```