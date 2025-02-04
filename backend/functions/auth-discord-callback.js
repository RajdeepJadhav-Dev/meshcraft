const axios = require('axios');
const { MongoClient } = require('mongodb');

exports.handler = async function (event, context) {
  const { code, state } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No code provided" }),
    };
  }

  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Use the access token to get user info
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const discordUser = userResponse.data;
    const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOneAndUpdate(
      { _id: state },
      {
        $set: {
          discordId: discordUser.id,
          discordUsername: discordUser.username,
          discordAvatar: avatarUrl,
        },
      },
      { returnDocument: "after" }
    );

    if (!user.value) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    return {
      statusCode: 302,
      headers: {
        Location: `${frontendUrl}/profile?userId=${state}&discordId=${discordUser.id}&discordUsername=${encodeURIComponent(discordUser.username)}&discordAvatar=${encodeURIComponent(avatarUrl)}&discordConnected=true`,
      },
    };
  } catch (error) {
    console.error("Error connecting Discord:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect Discord" }),
    };
  }
};
