import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import React from "react"

export default props => 
<footer class="footer bg-dark text-center text-white">
  
  <div class="text-center p-3" style={props.style}>
    Develop by <strong>AnnaTRocha</strong>
  </div>

  <div class="container p-4 pb-0">
    <section class="mb-4">
      <a class="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/🚀-anna-rocha-5a3126227/" role="button"
        ><i class="fab fa-linkedin-in"></i></a>

      <a class="btn btn-outline-light btn-floating m-1" href="https://github.com/AnnaTRocha" role="button"
        ><i class="fab fa-github"></i></a>
    </section>
  </div>
</footer>