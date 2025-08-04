document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async el => {
    const file = el.getAttribute("data-include");
    const res = await fetch(file);
    const html = await res.text();

    el.innerHTML = html;

    //  Run <script> tags inside included HTML
    const scripts = el.querySelectorAll("script");
    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");
      [...oldScript.attributes].forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });

    //  Dispatch custom event after navbar is loaded
    if (file === "navbar.html") {
      document.dispatchEvent(new CustomEvent("navbarLoaded"));
    }

    //  Dispatch custom event after footer is loaded
    if (file === "footer.html") {
      document.dispatchEvent(new CustomEvent("footerLoaded"));
    }
  });
});
