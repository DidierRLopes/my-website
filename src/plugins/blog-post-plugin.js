module.exports = (context, options) => ({
  name: 'blog-post-plugin',
  async contentLoaded({ content, actions }) {
    const { setGlobalData } = actions;
    const { blogPosts } = content;

    const updatedBlogPosts = blogPosts.map((post) => {
      const updatedContent =
        post.content +
        '\n\nThis sentence is added to the end of every blog post.';
      return { ...post, content: updatedContent };
    });

    setGlobalData({ updatedBlogPosts });
  },
});
