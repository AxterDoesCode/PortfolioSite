import { PostCard } from 'nextra-theme-blog';
import { getPosts, getTags } from '../../posts/get-posts';

export async function generateMetadata(props) {
  const params = await props.params;
  return {
    title: `Posts tagged "${decodeURIComponent(params.tag)}"`,
  };
}

export async function generateStaticParams() {
  const allTags = await getTags();
  return [...new Set(allTags)].map((tag) => ({ tag }));
}

export default async function TagPage(props) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  const posts = await getPosts();
  return (
    <>
      <h1>Posts tagged "{tag}"</h1>
      {posts
        .filter((post) => (post.frontMatter.tags ?? []).includes(tag))
        .map((post) => (
          <PostCard key={post.route} post={post} />
        ))}
    </>
  );
}
