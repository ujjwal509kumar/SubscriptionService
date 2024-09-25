'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/getsingleblog/${slug}`);
        if (!response.ok) throw new Error('Blog not found');
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-500 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Header />
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
          <div className="text-center max-w-lg">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Error 500</h1>
            <p className="text-lg text-gray-700 mb-6">
            &quot;Looks like you&apos;ve stumbled into a digital dead end, friend! It seems you&apos;ve either mistyped the URL, tried to sneak a peek without logging in, or are hoping to bypass the subscription wall. Don&apos;t worry, our developers have put in serious overtime to make sure that&apos;s not happening. It&apos;s like trying to sneak into a secret concert without a ticket – you might get close, but you&apos;re definitely not getting in.&quot;
            </p>
            <a href="/pages/exploreblogs">
              <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
                Back to Blog Page
              </button>
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <p className="text-base md:text-sm text-green-500 font-bold">
              &lt;{' '}
              <a
                href="/pages/exploreblogs"
                className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
              >
                BACK TO BLOGS
              </a>
            </p>
          </div>
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <header className="p-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
              <p className="text-gray-600 text-lg">Published on {new Date(blog.date).toLocaleDateString()}</p>
            </header>
            <div className="p-6">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.para1 }} />
              <div className="prose prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: blog.para2 }} />
              <div className="prose prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: blog.para3 }} />
              <div className="prose prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: blog.para4 }} />
              {blog.quote && (
                <blockquote className="border-l-4 border-green-500 italic my-8 pl-6 md:pl-12">
                  {blog.quote}
                </blockquote>
              )}
            </div>
          </article>
        </div>
        <hr className="border-t-2 border-gray-300 my-8" />
        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
