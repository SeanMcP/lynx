const yaml = require("js-yaml");

module.exports = (config) => {
  config.addDataExtension("yaml", (contents) => yaml.load(contents));

  config.addCollection("profiles", (collectionApi) => {
    return collectionApi.getFilteredByGlob("**/*.yaml");
  });

  config.addPassthroughCopy({
    "assets/": "/",
  });

  config.addFilter("smartCapitalize", smartCapitalize);

  config.addWatchTarget("assets/");

  config.addShortcode("social_link", (platform, handle) => {
    const PLATFORM_BASE = {
      facebook: "fb.me/",
      github: "github.com/",
      instagram: "instagram.com/",
      linkedin: "linkedin.com/in/",
      tiktok: "tiktok.com/@",
      twitch: "twitch.tv/",
      twitter: "twitter.com/",
      youtube: "youtube.com/channel/",
    };

    const base = PLATFORM_BASE[platform];

    if (!base || !handle) {
      return "";
    }

    return `<a class="social-link" href="https://${base}${handle}">
        ${smartCapitalize(platform)}
    </a>`;
  });
};

function smartCapitalize(content) {
  switch (content) {
    case "github": {
      return "GitHub";
    }
    case "linkedin": {
      return "LinkedIn";
    }
    case "youtube": {
      return "YouTube";
    }
    default: {
      return content[0].toUpperCase() + content.slice(1);
    }
  }
}
