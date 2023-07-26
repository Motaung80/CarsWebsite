function setTheme(theme) {
    var element = document.getElementById("theme");
    element.setAttribute("href", "Style/" + theme + ".css");
    localStorage.setItem("theme", theme);
}
var savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    setTheme(savedTheme);
}

function setTheme(theme) {
    // Set the theme on the page
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.querySelector('footer').classList.add('dark');
      document.querySelectorAll('.theme button').forEach(btn => btn.classList.add('dark'));
    } else {
      document.body.classList.remove('dark');
      document.querySelector('footer').classList.remove('dark');
      document.querySelectorAll('.theme button').forEach(btn => btn.classList.remove('dark'));
    }
}