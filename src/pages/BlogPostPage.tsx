import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { Button } from '../components/Button';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const post = {
    id: 6,
    title: "From Observation to Co-Creation: The Age of AI-Driven Building Has Begun",
    author: "Stefan Ebner",
    date: "March 18, 2025",
    readTime: "7 min",
    category: "AI & Innovation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    authorImage: "https://i.imgur.com/YhOqtpJ.png",
    content: `
      <h2>The End of Management as We Know It</h2>
      <p>For centuries, human organizations were defined by structure, control, and delegation. But AI removes the need for traditional management, hierarchy, and slow decision-making. It doesn't need permission to create, optimize, or execute. It can build, iterate, and evolve—faster than any human team ever could.</p>
      <p>This means the old structures will collapse. Not in the distant future, but now. In the coming years, the most successful companies will not be managed; they will be curated—shaped by those who understand how to orchestrate AI and human intelligence into something greater than either could achieve alone.</p>
      <p>The shift is clear:</p>
      <ul>
        <li>🚀 From managing to enabling</li>
        <li>🚀 From decision-making to co-creating</li>
        <li>🚀 From observing to building</li>
      </ul>

      <h2>AI as a Partner, Not a Tool</h2>
      <p>We need to stop looking at AI as a productivity booster or an automation tool. This is small thinking. AI is not an assistant—it is a creative force. One that can:</p>
      <ul>
        <li>✅ Conceptualize new ideas in seconds</li>
        <li>✅ Optimize execution beyond human limitations</li>
        <li>✅ Connect insights and strategies across industries</li>
      </ul>
      <p>But AI is not the enemy of human creativity. It is its amplifier. The best leaders will not be those who control AI but those who co-create with it. They will embrace its strengths, challenge its perspectives, and combine it with human ingenuity to unlock entirely new possibilities.</p>

      <h2>The Death of Passive Work</h2>
      <p>In this AI-driven future, there will be no room for passive roles. No one will be paid to "observe" or "manage" without contributing to the building process. Those who resist this shift will find themselves irrelevant—not because AI will take their jobs, but because the very nature of work will evolve beyond them.</p>
      <p>Every person in an organization will need to be a creator, contributor, or curator—actively involved in shaping what is being built. The walls between thinkers and doers will fall. Strategy will not be something debated in meetings; it will be something tested, iterated, and executed in real-time, at the speed of AI.</p>

      <h2>A Future Worth Building</h2>
      <p>This isn't about utopian dreams or dystopian fears. It's about recognizing what's happening right in front of us. AI is not replacing human ambition—it's accelerating it. The question is not whether this shift will happen, but whether we will embrace it before it sweeps past us.</p>
      <p>So the real challenge for leaders today is simple:</p>
      <ul>
        <li>💡 Are you still observing? Or are you ready to build?</li>
        <li>💡 Are you still managing? Or are you ready to curate?</li>
        <li>💡 Are you still delegating? Or are you ready to co-create?</li>
      </ul>
      <p>The age of passive work is over. The era of AI-powered co-creation has begun. The ones who recognize this first will be the ones shaping the future. The rest will simply watch.</p>
    `
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="p-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={post.authorImage}
                  alt={post.author}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.author}
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-6">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button variant="outline">
                <Bookmark className="h-4 w-4 mr-2" />
                Save for later
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center">
            <img
              className="h-16 w-16 rounded-full"
              src={post.authorImage}
              alt={post.author}
            />
            <div className="ml-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {post.author}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                David is a technology strategist and AI researcher with over 15 years of experience in enterprise software development and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};