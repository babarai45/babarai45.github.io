/* ==========================================================================
   Muhammad Babar - Portfolio Interaction & 3D/Animation Engine
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initThemeSwitcher();
  initTypingEffect();
  initCanvas3D();
  init3DTilt();
  initScrollReveal();
  initSkillsTabs();
  initClipboardCopier();
  initAIAgentTerminal();
  
  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. Mobile Navigation & Hamburger Hamburger Actions
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector(".site-header");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll Nav background change
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scroll-nav");
    } else {
      header.classList.remove("scroll-nav");
    }
  });
}

/* ==========================================================================
   2. Theme Swapper (Glow Accents Switcher)
   ========================================================================== */
function initThemeSwitcher() {
  const dots = document.querySelectorAll(".theme-dot");
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const selectedTheme = e.target.getAttribute("data-theme");
      
      // Update active state in UI
      dots.forEach(d => d.classList.remove("active"));
      e.target.classList.add("active");

      // Apply theme to body
      document.body.className = `${selectedTheme}-theme`;
    });
  });
}

/* ==========================================================================
   3. Hero Title Typing Loop
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById("role-typing");
  if (!typingEl) return;

  const roles = [
    "Applied AI Systems",
    "Large Language Models",
    "Data Science & MLOps",
    "Full-Stack Dev",
    "Machine Unlearning"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. 3D HTML5 Canvas Particle Constellation Network
   ========================================================================== */
function initCanvas3D() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(80, Math.floor((width * height) / 18000));
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  class Particle {
    constructor() {
      // 3D coordinates (z represents depth depth value)
      this.x = Math.random() * width * 1.5 - width * 0.25;
      this.y = Math.random() * height * 1.5 - height * 0.25;
      this.z = Math.random() * 800 + 200; // Depth value 200 to 1000
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.vz = (Math.random() - 0.5) * 0.1;
      this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
      // Slow drift
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      // Wrap around boundary coordinates
      if (this.x < -width * 0.25 || this.x > width * 1.25) this.vx *= -1;
      if (this.y < -height * 0.25 || this.y > height * 1.25) this.vy *= -1;
      if (this.z < 200 || this.z > 1000) this.vz *= -1;
    }

    draw() {
      // Calculate 3D Parallax offset based on cursor target coordinates
      // Deeper particles (high Z) move less than closer particles (low Z)
      const mouseParallaxX = (mouse.x - width / 2) * (200 / this.z);
      const mouseParallaxY = (mouse.y - height / 2) * (200 / this.z);

      const px = this.x + mouseParallaxX;
      const py = this.y + mouseParallaxY;

      // Size calculation based on depth
      const sizeScale = 400 / this.z;
      const currentRadius = Math.max(0.5, this.radius * sizeScale);

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(px, py, currentRadius, 0, Math.PI * 2);
      
      // Dynamic color opacity based on depth values
      const alpha = Math.min(0.65, Math.max(0.08, 1 - (this.z / 1000)));
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      
      ctx.fillStyle = themeColor === "#00f2fe" ? `rgba(0, 242, 254, ${alpha})` : 
                      themeColor === "#f355da" ? `rgba(243, 85, 218, ${alpha})` : 
                      `rgba(0, 242, 96, ${alpha})`;
                      
      ctx.fill();
    }
  }

  // Generate constellation array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const rgb = themeColor === "#00f2fe" ? "0, 242, 254" : 
                themeColor === "#f355da" ? "243, 85, 218" : 
                "0, 242, 96";

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const mouseParallaxX1 = (mouse.x - width / 2) * (200 / p1.z);
        const mouseParallaxY1 = (mouse.y - height / 2) * (200 / p1.z);
        const mouseParallaxX2 = (mouse.x - width / 2) * (200 / p2.z);
        const mouseParallaxY2 = (mouse.y - height / 2) * (200 / p2.z);

        const x1 = p1.x + mouseParallaxX1;
        const y1 = p1.y + mouseParallaxY1;
        const x2 = p2.x + mouseParallaxX2;
        const y2 = p2.y + mouseParallaxY2;

        const distance = Math.hypot(x1 - x2, y1 - y2);

        // Connect only if close on 2D space projection
        if (distance < 110) {
          const depthAvg = (p1.z + p2.z) / 2;
          const alpha = (1 - (distance / 110)) * Math.min(0.25, Math.max(0.01, 1 - (depthAvg / 1000)));
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    // Clear viewport with transparency to keep orb background visible
    ctx.clearRect(0, 0, width, height);

    // Smooth cursor coordinates follow lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. Interactive 3D Parallax Tilt Effect
   ========================================================================== */
function init3DTilt() {
  const tiltCards = document.querySelectorAll(".tilt-card, .tilt-card-sm");
  
  tiltCards.forEach(card => {
    const isSmall = card.classList.contains("tilt-card-sm");
    const maxRotation = isSmall ? 6 : 14; // Reduce rotation on small list cards
    
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate rotation based on center position
      const px = (x - width / 2) / (width / 2); // Value from -1 to 1
      const py = (y - height / 2) / (height / 2); // Value from -1 to 1
      
      const rotateX = (-py * maxRotation).toFixed(2);
      const rotateY = (px * maxRotation).toFixed(2);
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      
      // Set custom properties for styling glow shines
      card.style.setProperty("--mouse-x", `${(x / width * 100).toFixed(1)}%`);
      card.style.setProperty("--mouse-y", `${(y / height * 100).toFixed(1)}%`);
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      card.style.setProperty("--mouse-x", `50%`);
      card.style.setProperty("--mouse-y", `50%`);
    });
  });
}

/* ==========================================================================
   6. Scroll Reveal Observer & Scroll Spy Nav Links
   ========================================================================== */
function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("section");

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        
        // If skill section is shown, trigger bar fillings
        if (entry.target.id === "skills") {
          animateSkillsBars();
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealItems.forEach(item => revealOnScroll.observe(item));

  // Scrollspy navigation indicator
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* ==========================================================================
   7. Skills Categorized Tabs Selector & Fill Animator
   ========================================================================== */
function initSkillsTabs() {
  const tabButtons = document.querySelectorAll(".skill-tab-btn");
  const panes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetCategory = btn.getAttribute("data-category");
      
      tabButtons.forEach(b => b.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));
      
      btn.classList.add("active");
      const targetPane = document.getElementById(targetCategory);
      if (targetPane) {
        targetPane.classList.add("active");
        
        // Trigger fill animation inside tab pane
        const fills = targetPane.querySelectorAll(".bar-fill");
        fills.forEach(fill => {
          const width = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.width = width;
          }, 50);
        });
      }
    });
  });
}

function animateSkillsBars() {
  const activeFills = document.querySelectorAll(".tab-pane.active .bar-fill");
  activeFills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 100);
  });
}

/* ==========================================================================
   8. Click To Copy Clipboard Utility
   ========================================================================== */
function initClipboardCopier() {
  const copyEls = document.querySelectorAll(".click-to-copy");
  
  copyEls.forEach(el => {
    el.addEventListener("click", () => {
      const textToCopy = el.getAttribute("data-copy");
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show success state
        el.classList.add("copied");
        const hintEl = el.querySelector(".copy-hint");
        const oldHtml = hintEl.innerHTML;
        
        hintEl.innerHTML = `<i class="fa-solid fa-check" style="color: #10b981"></i> Copied!`;
        
        setTimeout(() => {
          el.classList.remove("copied");
          hintEl.innerHTML = oldHtml;
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy clipboard values: ", err);
      });
    });
  });
}

/* ==========================================================================
   9. Interactive AI Agent Chat Terminal Simulator
   ========================================================================== */
function initAIAgentTerminal() {
  const terminalBody = document.getElementById("terminal-body");
  const terminalInput = document.getElementById("terminal-input");
  const terminalSend = document.getElementById("terminal-send-btn");
  const presetBtns = document.querySelectorAll(".preset-btn");
  const typingStatus = document.getElementById("terminal-typing-status");

  if (!terminalBody || !terminalInput || !terminalSend) return;

  // DB responses matching queries to Muhammad Babar's resume
  const responses = {
    goals: `
<span class="terminal-prompt">[AGENT]:</span> **Muhammad Babar's Career & Graduate Goals:**
*   **Target:** Pursuing a Master of Science (MS) in **Artificial Intelligence** / **Data Science**.
*   **Research Areas of Interest:** Practical AI systems, Natural Language Processing (NLP), **Responsible AI**, and **Machine Unlearning** inside LLMs (safe weight adjustments without full retraining).
*   **Aspiration:** Bridging core software engineering fundamentals with agentic frameworks to build safe, scalable, and socially beneficial AI tools.
`,
    campusgpt: `
<span class="terminal-prompt">[AGENT]:</span> **CampusGPT — AI-Powered Agentic Campus ERP System:**
*   **Role & ID:** Final Year Project | FYP ID: FYP-BSDSM-F25-005
*   **Core Logic:** Combines traditional enterprise ERP workflows (role-based portals for students, teachers, staff, admins) with LLM automation using **Gemini** & **Groq** APIs.
*   **Key Features:**
    1.  *NLP Academic Advisor:* Automated helper answering student curricula questions.
    2.  *Assessment Generator:* Dynamic quiz and homework creation from reference docs.
    3.  *Predictive Analytics:* ML workflows evaluating attendance risk files and forecasting SGPA/CGPA outcomes.
`,
    shophub: `
<span class="terminal-prompt">[AGENT]:</span> **ShopHub — Multi-Vendor E-Commerce Platform:**
*   **Concept:** Shopify-inspired online selling network built as an open-source SDG-oriented project (UN SDG 17: Partnerships for the Goals).
*   **Social Impact:** Directed to support low-income sellers and widowed women. Cooperated with a 5-member team to build backend orders pipelines.
*   **Outcome:** Onboarded local merchants, enabling secondary earning channels for **50+ families**.
`,
    experience: `
<span class="terminal-prompt">[AGENT]:</span> **Professional Work Experience:**
1.  **Data Analyst Intern (AI Agents) at Transcure, Lahore (Feb 2025 – Jul 2025):**
    *   Interacted with medical claiming tools like ELIXA and CODIN.
    *   Analyzed claim logs and billing pipelines serving the US medical healthcare billing market.
2.  **Web Developer at First Web Solution, Lahore (Aug 2023 – Feb 2024):**
    *   Designed and maintained web products using PHP, JS, AJAX, and SQL.
    *   Contributed to key deployed live applications: **Zufta.pk**, **PetsCity.pk**, **FlyBritannia.co.uk**, **Manmohni.pk**, and **Alhamdskinclinics.com**.
`,
    certifications: `
<span class="terminal-prompt">[AGENT]:</span> **Top Certifications & Training (10+ Credentials):**
*   *Stanford & DeepLearning.AI:* Machine Learning Specialization.
*   *DeepLearning.AI:* ML in Production (MLOps) & TensorFlow Developer Specialization.
*   *Google:* Advanced Data Analytics Professional Certificate.
*   *Duke University:* Python Essentials for MLOps.
*   *IBM:* Python for Data Science, ML with Python, Databases & SQL.
*   *Govt of Pakistan:* Fully funded Professional AI Training via NAVTTC under PM Skills program.
`,
    skills: `
<span class="terminal-prompt">[AGENT]:</span> **Muhammad Babar's Tech Stack & Tooling:**
*   **Programming Languages:** Python, JavaScript, PHP, SQL, C, C++, Rust (Basics).
*   **AI/ML Libraries:** Scikit-learn, TensorFlow, NLP pipelines, RAG frameworks, LangChain.
*   **Backend & DBs:** FastAPI (Python REST), MongoDB, PostgreSQL, REST APIs.
*   **Web Frontend:** React.js, WordPress customizations, CSS3 grid layouts, HTML5 APIs.
*   **Tools:** Git/GitHub, Jupyter, Docker containers, Vercel cloud deployments.
`,
    contact: `
<span class="terminal-prompt">[AGENT]:</span> **Direct Contact Paths:**
*   **Email:** babar.xagi@gmail.com
*   **LinkedIn:** linkedin.com/in/m-babar-agi/
*   **GitHub:** github.com/babar-xagi
*   *Feel free to copy email details from the contact section cards!*
`,
    fallback: `
<span class="terminal-prompt">[AGENT]:</span> Query processed. Muhammad Babar is a Data Science graduate (CGPA 3.28) and CS Associate Degree holder (CGPA 3.67) specializing in AI Systems, LangChain Agents, MLOps, and Web Platforms.
*   Try typing keywords like **"CampusGPT"**, **"ShopHub"**, **"Experience"**, **"Skills"**, **"Certifications"**, or **"Graduate goals"** to query details.
`
  };

  // Click handler for preset buttons
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const queryText = btn.getAttribute("data-query");
      runQuery(queryText);
    });
  });

  // Event handler for send button click
  terminalSend.addEventListener("click", () => {
    submitInput();
  });

  // Keyboard Enter listener
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitInput();
    }
  });

  function submitInput() {
    const rawText = terminalInput.value.trim();
    if (!rawText) return;
    
    runQuery(rawText);
    terminalInput.value = "";
  }

  function runQuery(queryText) {
    // 1. Output user message bubble
    appendBubble(queryText, "user-bubble");
    scrollToBottom();

    // 2. Show agent typing indicator
    typingStatus.style.display = "flex";
    scrollToBottom();

    // Disable input while thinking
    terminalInput.disabled = true;
    terminalSend.disabled = true;

    // 3. Resolve response key based on search query matching keywords
    const normalized = queryText.toLowerCase();
    let replyKey = "fallback";

    if (normalized.includes("goal") || normalized.includes("graduate") || normalized.includes("ms") || normalized.includes("academic interest")) {
      replyKey = "goals";
    } else if (normalized.includes("campus") || normalized.includes("fyp") || normalized.includes("erp") || normalized.includes("campusgpt")) {
      replyKey = "campusgpt";
    } else if (normalized.includes("shophub") || normalized.includes("sdg") || normalized.includes("ecommerce") || normalized.includes("order2wear")) {
      replyKey = "shophub";
    } else if (normalized.includes("experience") || normalized.includes("job") || normalized.includes("intern") || normalized.includes("transcure") || normalized.includes("work") || normalized.includes("developer")) {
      replyKey = "experience";
    } else if (normalized.includes("cert") || normalized.includes("course") || normalized.includes("training") || normalized.includes("specialization") || normalized.includes("stanford") || normalized.includes("ibm")) {
      replyKey = "certifications";
    } else if (normalized.includes("skill") || normalized.includes("tech") || normalized.includes("stack") || normalized.includes("python") || normalized.includes("programming") || normalized.includes("code")) {
      replyKey = "skills";
    } else if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("phone") || normalized.includes("address") || normalized.includes("connect")) {
      replyKey = "contact";
    }

    // 4. Simulate response delay
    const delay = Math.random() * 500 + 600; // 600ms - 1100ms
    setTimeout(() => {
      typingStatus.style.display = "none";
      terminalInput.disabled = false;
      terminalSend.disabled = false;
      terminalInput.focus();

      // Output agent message bubble with typed out layout
      appendBubble("", "agent-bubble", responses[replyKey]);
      scrollToBottom();
    }, delay);
  }

  function appendBubble(text, className, rawHtml = "") {
    const bubble = document.createElement("div");
    bubble.className = `terminal-line ${className}`;
    
    if (rawHtml) {
      // If HTML formatting, type it out dynamically using block elements
      bubble.innerHTML = rawHtml;
      
      // Highlight code/list blocks styling
      const listItems = bubble.querySelectorAll("li");
      listItems.forEach((li, idx) => {
        li.style.opacity = '0';
        li.style.transform = 'translateY(5px)';
        li.style.transition = `all 0.3s ease ${idx * 0.1}s`;
        setTimeout(() => {
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, 50);
      });
    } else {
      bubble.textContent = `> ${text}`;
    }

    terminalBody.appendChild(bubble);
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}
