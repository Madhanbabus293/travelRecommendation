class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.state = {};
    window.addEventListener("popstate", (event) => this.onPopState(event));
  }

  addRoute(path, handler) {
    this.routes.push({ path, handler });
  }

  navigate(path, state = {}) {
    window.history.pushState(state, "", path);
    this.state = state;
    this.handleRoute(path);
  }

  handleRoute(path) {
    const route = this.routes.find((route) => route.path === path);
    if (route) {
      this.renderComponent(route.handler);
      this.currentRoute = route;
    } else {
      this.handleNotFound();
    }
  }

  renderComponent(handler) {
    handler(this.state);
  }

  onPopState(event) {
    const currentPath = window.location.pathname;
    this.handleRoute(currentPath);
  }

  handleNotFound() {
    document.getElementById(
      "app"
    ).innerHTML = `<h1>NOT FOUND PAGE Page</h1><p>State: ${JSON.stringify(
      state
    )}</p>`;
  }
}

// Example component handler:
function HomePageHandler(state) {
  document.getElementById("app").innerHTML = `<div class='overview'> 
    <h3>Expolre Dream Destination </h3>
    <span>
A dream destination is a serene paradise offering breathtaking landscapes, vibrant cultures, luxurious resorts, and unforgettable experiences. It's where adventure meets relaxation and memories are made.</span>
    <button> Book now </button>
    </div>
    <div id="result"></div>`;
}

function AboutPageHandler(state) {
  document.getElementById(
    "app"
  ).innerHTML = `<div class='aboutpage'><h1>About Page</h1> <section class="company-desc">
      <h2>Welcome to Our Travel Booking Company</h2>
      <p>
        We are a leading platform for booking vacations, travel packages, and flights to destinations around the world. Our mission is to make your travel experiences unforgettable with personalized service, incredible deals, and seamless booking options. Whether you're planning a relaxing getaway or an adventurous journey, we're here to help you every step of the way.
      </p>
    </section>

    <section class="our-team">
      <h2>Our Team</h2>
      <div class="team-members">
        <div class="team-member">
          <img src="assets/member.png" alt="Team Member 1">
          <h3>John Doe</h3>
          <p class="role">Founder & CEO</p>
          <p class="role-desc">
            John is the visionary behind our company. With years of experience in the travel industry, he leads the company with a passion for delivering amazing travel experiences to customers worldwide.
          </p>
        </div>
        <div class="team-member">
          <img src="assets/member.png" alt="Team Member 2">
          <h3>Jane Smith</h3>
          <p class="role">Marketing Director</p>
          <p class="role-desc">
            Jane manages all marketing strategies and ensures our brand resonates with customers. Her expertise in digital marketing helps us reach travelers everywhere, ensuring they get the best offers.
          </p>
        </div>
        <div class="team-member">
          <img src="assets/member.png" alt="Team Member 3">
          <h3>David Lee</h3>
          <p class="role">Customer Support Manager</p>
          <p class="role-desc">
            David is dedicated to providing excellent customer service. He manages our support team, ensuring our customers receive quick and helpful responses for all their travel-related queries.
          </p>
        </div>
      </div>
    </section>
  </div></div>`;
}

function ContactUsPageHandler(state) {
  document.getElementById(
    "app"
  ).innerHTML = `<div class='contactus' >
  <h1>Contact Us</h1><form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="5" required></textarea>

      <button type="submit">Submit</button>
    </form></div>`;
}

const router = new Router();
router.addRoute("/", HomePageHandler);
router.addRoute("/about", AboutPageHandler);
router.addRoute("/contact", ContactUsPageHandler);

//initial route
router.navigate("/");

document.getElementById("logo").addEventListener("click", () => {
  router.navigate("/");
});

document.getElementById("home").addEventListener("click", () => {
  router.navigate("/");
});

document.getElementById("aboutus").addEventListener("click", () => {
  router.navigate("/about");
});

document.getElementById("contactus").addEventListener("click", () => {
  router.navigate("/contact");
});
