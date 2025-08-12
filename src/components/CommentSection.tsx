import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  workspaceId: string;
  initialComments?: Comment[];
}

// Sample comments data
const sampleComments: Comment[] = [
  {
    id: 1,
    author: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    content: 'Amazing setup! Love the RGB lighting and the dual monitor configuration. What monitor arms are you using?',
    timestamp: '2 hours ago',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: 'Azim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        content: 'Thanks! I\'m using the VIVO dual monitor stand. Really sturdy and great for the price.',
        timestamp: '1 hour ago',
        likes: 5,
        isLiked: true,
      }
    ]
  },
  {
    id: 2,
    author: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ac?w=40&h=40&fit=crop&crop=face',
    content: 'Clean and professional! Could you share the specs of your PC? Thinking of building something similar.',
    timestamp: '5 hours ago',
    likes: 8,
    isLiked: true,
  },
  {
    id: 3,
    author: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    content: 'That cable management though! 🔥 Any tips for someone just starting their setup journey?',
    timestamp: '1 day ago',
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 31,
        author: 'Azim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        content: 'Start with a good desk with cable management features. I use velcro ties and cable trays under the desk.',
        timestamp: '20 hours ago',
        likes: 3,
        isLiked: true,
      }
    ]
  },
  {
    id: 4,
    author: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    content: 'Love the aesthetic! The lighting really brings everything together. What RGB software are you using?',
    timestamp: '2 days ago',
    likes: 6,
    isLiked: false,
  }
];

export default function CommentSection({ workspaceId, initialComments = sampleComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle new comment submission
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const comment: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setIsSubmitting(false);
  };

  // Handle reply submission
  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reply: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      content: replyContent,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };
    
    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    
    setReplyContent('');
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  // Handle like toggle
  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment, 
              replies: comment.replies?.map(reply => 
                reply.id === commentId 
                  ? { 
                      ...reply, 
                      isLiked: !reply.isLiked, 
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 
            }
          : comment
      ));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add New Comment */}
      <div className="mb-8">
        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this workspace..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            {/* Main Comment */}
            <div className="flex gap-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                style={{
                  background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23e5e7eb"/><text x="20" y="25" text-anchor="middle" fill="%236b7280" font-size="14" font-family="Arial">${comment.author[0]}</text></svg>') center/cover`
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-3">{comment.content}</p>
                
                {/* Comment Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      comment.isLiked 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-gray-500 hover:text-red-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {comment.likes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-4 border-l-2 border-blue-200 pl-4">
                    <div className="flex gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                        alt="Your avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={`Reply to ${comment.author}...`}
                          className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim() || isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-1 rounded text-sm font-medium transition-colors"
                          >
                            {isSubmitting ? 'Replying...' : 'Reply'}
                          </button>
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent('');
                            }}
                            className="text-gray-500 hover:text-gray-700 px-4 py-1 rounded text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          style={{
                            background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23e5e7eb"/><text x="16" y="20" text-anchor="middle" fill="%236b7280" font-size="12" font-family="Arial">${reply.author[0]}</text></svg>') center/cover`
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-gray-900 text-sm">{reply.author}</h5>
                            <span className="text-xs text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                          <button
                            onClick={() => handleLike(reply.id, true, comment.id)}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              reply.isLiked 
                                ? 'text-red-600 hover:text-red-700' 
                                : 'text-gray-500 hover:text-red-600'
                            }`}
                          >
                            <svg className="w-3 h-3" fill={reply.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {reply.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      {comments.length > 0 && (
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
}
