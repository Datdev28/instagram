import { useEffect, useCallback } from 'react';
import ProfileUserPost from '../../components/profileUser/ProfileUserPost';
import useGetRandomPosts from '../../hooks/useGetRandomPosts';
import usePostStore from '../../store/postStore';
import Footer from '../../components/footer/Footer';
const ExplorePostPage = () => {
  const { fetchRandomPosts, loading, hasMore } = useGetRandomPosts();
  const { randomPosts } = usePostStore();

  useEffect(() => {
    if (randomPosts.length === 0) {
      fetchRandomPosts();
    }
  }, [fetchRandomPosts, randomPosts.length]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      fetchRandomPosts();
    }
  }, [loading, hasMore, fetchRandomPosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const LoadingSkeleton = () => (
    <>
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-800 animate-pulse rounded-lg"></div>
      ))}
    </>
  );

  return (
    <div className='w-full max-w-4xl mx-auto text-white px-4 max-sm:mt-10'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Khám phá</h1>
        <p className='text-gray-400'>Khám phá những bài viết thú vị từ cộng đồng</p>
      </div>

      <div className='grid grid-cols-3 gap-1'>
        {randomPosts.map((post) => (
          <ProfileUserPost 
            key={post.id} 
            post={post} 
            isExplore={true}
          />
        ))}
        
        {loading && <LoadingSkeleton />}
      </div>

      {hasMore && !loading && randomPosts.length > 0 && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={fetchRandomPosts}
            className='px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors'
          >
            Tải thêm
          </button>
        </div>
      )}

      {!loading && randomPosts.length === 0 && (
        <div className='text-center mt-16'>
          <div className='text-6xl mb-4'>🔍</div>
          <h2 className='text-xl font-semibold mb-2'>Không có bài viết nào</h2>
          <p className='text-gray-400'>Hãy thử lại sau hoặc tạo bài viết mới!</p>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ExplorePostPage;