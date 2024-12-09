const counters = document.querySelectorAll('.purecounter');
  counters.forEach(counter => {
    const start = parseInt(counter.getAttribute('data-purecounter-start'));
    const end = parseInt(counter.getAttribute('data-purecounter-end'));
    const duration = parseInt(counter.getAttribute('data-purecounter-duration'));
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
      current += increment;
      counter.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  });
  
      // Smooth scrolling for navigation links
      document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            const topOffset = targetSection.offsetTop;
            window.scrollTo({
              top: topOffset,
              behavior: 'smooth'
            });
          }
        });
      });
    
      // Highlighting active navigation link
      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        document.querySelectorAll('.nav-link').forEach(link => {
          const sectionId = link.getAttribute('href').substring(1);
          const section = document.getElementById(sectionId);
          if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      });
    
    