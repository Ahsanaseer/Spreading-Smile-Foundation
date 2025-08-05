document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async el => {
    const file = el.getAttribute("data-include");
    
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch(file, { 
        signal: controller.signal,
        cache: 'no-cache' // Prevent caching issues
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const html = await res.text();
      el.innerHTML = html;

      // Run <script> tags inside included HTML
      const scripts = el.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        [...oldScript.attributes].forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
      });

      // Dispatch custom event after navbar is loaded
      if (file === "navbar.html") {
        document.dispatchEvent(new CustomEvent("navbarLoaded"));
      }

      // Dispatch custom event after footer is loaded
      if (file === "footer.html") {
        document.dispatchEvent(new CustomEvent("footerLoaded"));
      }
      
    } catch (error) {
      console.warn(`Failed to load ${file}:`, error.message);
      // Add fallback content or error message
      el.innerHTML = `<div style="padding: 20px; text-align: center; color: #666;">
        <p>Content temporarily unavailable</p>
      </div>`;
    }
  });
});
