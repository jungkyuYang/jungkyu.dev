import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";
import dataJson from "../data.json" assert { type: "json" };

const data = {
  description: "My octo projects",
  githubUsername: "octocat",
  avatarUrl: "",
  displayName: "",
  email: "",
  socials: {},
};

async function fetchGitHubUser(username, token) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "portfolio-setup",
      },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error.message);
    return null;
  }
}

(async () => {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
  dotenv.config({ path: path.join(process.cwd(), ".env.local") });

  if (!process.env.GH_TOKEN) {
    console.error("❌ Please set GH_TOKEN in .env or .env.local");
    console.log("📝 Create a .env.local file with:");
    console.log("   GH_TOKEN=your_github_personal_access_token");
    console.log("   IS_TEMPLATE=false");
    return;
  }

  // Check if this is a template or user's actual site
  if (process.env.IS_TEMPLATE === "false") {
    console.log("✅ This is your personal site. Fetching GitHub data...");

    // Get GitHub username from data.json
    const githubUsername = dataJson.githubUsername;

    if (
      githubUsername &&
      githubUsername !== "octocat" &&
      githubUsername !== "your_github_username"
    ) {
      console.log(`🔍 Fetching data for GitHub user: ${githubUsername}`);

      const userData = await fetchGitHubUser(
        githubUsername,
        process.env.GH_TOKEN
      );

      if (userData) {
        // Update data.json with GitHub user information
        const updatedData = {
          ...dataJson,
          githubUsername: userData.login,
          displayName: userData.name || userData.login,
          avatarUrl: userData.avatar_url,
          email: userData.email || dataJson.email,
          description:
            dataJson.description || `My projects and contributions on GitHub.`,
          socials: {
            ...dataJson.socials,
            github: `https://github.com/${userData.login}`,
            blog: userData.blog || null,
          },
        };

        // Write updated data back to data.json
        const dataPath = path.join(process.cwd(), "data.json");
        await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));

        console.log(
          "✅ Successfully updated data.json with GitHub user information"
        );
        console.log(`👤 User: ${updatedData.displayName}`);
        console.log(`📧 Email: ${updatedData.email || "Not public"}`);
        console.log(`🔗 GitHub: ${updatedData.socials.github}`);
      } else {
        console.error("❌ Failed to fetch GitHub user data");
      }
    } else {
      console.log(
        "⚠️  Please update githubUsername in data.json with your actual GitHub username"
      );
    }
    return;
  }

  // This is still a template
  if (dataJson.githubUsername !== "jungkyuYang") {
    // This means it's not the template, it's someone's legit site
    return;
  }

  console.log(
    "⚠️  This is still a template. Please update data.json file and set IS_TEMPLATE to false in .env.local to use this template"
  );
  console.log("⚙️  Reverting personal data to template data...");

  // Remove favicon.ico
  const faviconPath = path.join(process.cwd(), "public", "favicon.ico");
  try {
    await fs.unlink(faviconPath);
    console.log("⚙️  Removed favicon.ico");
  } catch (error) {
    // File might not exist, that's okay
  }

  // Open data.json, merge it with data for octocat and save it to disk.
  const dataPath = path.join(process.cwd(), "data.json");
  const newData = { ...dataJson, ...data };
  // Write it back to disk.
  await fs.writeFile(dataPath, JSON.stringify(newData, null, 4));

  console.log("⚙️  Reverted to template data (using octocat).");
})();
