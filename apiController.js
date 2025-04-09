const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

let cachedUsers = [];
let cachedPosts = [];
let cachedComments = [];

async function fetchData() {
  if (cachedUsers.length === 0) {
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      axios.get(`${BASE_URL}/users`),
      axios.get(`${BASE_URL}/posts`),
      axios.get(`${BASE_URL}/comments`)
    ]);
    cachedUsers = usersRes.data;
    cachedPosts = postsRes.data;
    cachedComments = commentsRes.data;
  }
}

exports.getTopUsers = async (req, res) => {
  try {
    await fetchData();
    const commentCountMap = {};

    cachedComments.forEach(c => {
      commentCountMap[c.postId] = (commentCountMap[c.postId] || 0) + 1;
    });

    const userCommentMap = {};

    cachedPosts.forEach(p => {
      const commentCount = commentCountMap[p.id] || 0;
      userCommentMap[p.userId] = (userCommentMap[p.userId] || 0) + commentCount;
    });

    const topUsers = cachedUsers
      .map(u => ({ ...u, commentCount: userCommentMap[u.id] || 0 }))
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 5);

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getPopularPosts = async (req, res) => {
  try {
    await fetchData();

    const commentCountMap = {};

    cachedComments.forEach(c => {
      commentCountMap[c.postId] = (commentCountMap[c.postId] || 0) + 1;
    });

    const maxComments = Math.max(...Object.values(commentCountMap));

    const popularPosts = cachedPosts
      .filter(p => commentCountMap[p.id] === maxComments)
      .map(p => ({
        ...p,
        commentCount: commentCountMap[p.id]
      }));

    res.json(popularPosts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getLatestPosts = async (req, res) => {
  try {
    await fetchData();

    const latestPosts = [...cachedPosts]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    res.json(latestPosts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest posts' });
  }
};
