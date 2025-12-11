import { sampleComments } from "@/datas/article";
import { Comment, CommentSectionProps } from "@/types/comment";
import React, { useState } from "react";

export default function CommentSection({
  workspaceId,
  initialComments = sampleComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle new comment submission
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setIsSubmitting(false);
  };

  // Handle reply submission
  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reply: Comment = {
      id: Date.now(),
      author: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };

    setComments(
      comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );

    setReplyContent("");
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  // Handle like toggle
  const handleLike = (
    commentId: number,
    isReply: boolean = false,
    parentId?: number
  ) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        isLiked: !reply.isLiked,
                        likes: reply.isLiked
                          ? reply.likes - 1
                          : reply.likes + 1,
                      }
                    : reply
                ),
              }
            : comment
        )
      );
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment
        )
      );
    }
  };

  return (
    <div className="bg-[#0F0F0F] rounded-2xl p-6 shadow-sm border border-[#F3F4F6]/10">
      <h3 className="text-xl font-semibold text-[#F3F4F6] mb-6">
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
              className="w-full p-3 bg-[#0F0F0F]/50 border border-[#F3F4F6]/20 text-[#F3F4F6] rounded-lg resize-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent placeholder-[#F3F4F6]/50"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-[#FACC15] hover:bg-[#FACC15]/90 disabled:bg-[#F3F4F6]/20 disabled:cursor-not-allowed text-[#0F0F0F] px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-[#F3F4F6]/10 pb-6 last:border-b-0"
          >
            {/* Main Comment */}
            <div className="flex gap-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                style={{
                  background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23e5e7eb"/><text x="20" y="25" text-anchor="middle" fill="%236b7280" font-size="14" font-family="Arial">${comment.author[0]}</text></svg>') center/cover`,
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-[#F3F4F6]">
                    {comment.author}
                  </h4>
                  <span className="text-sm text-[#F3F4F6]/50">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-[#F3F4F6]/80 mb-3">{comment.content}</p>

                {/* Comment Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      comment.isLiked
                        ? "text-[#FACC15] hover:text-[#FACC15]/80"
                        : "text-[#F3F4F6]/50 hover:text-[#FACC15]"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill={comment.isLiked ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {comment.likes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-[#F3F4F6]/50 hover:text-[#FACC15] transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-4 border-l-2 border-[#FACC15]/50 pl-4">
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
                          className="w-full p-2 bg-[#0F0F0F]/50 border border-[#F3F4F6]/20 text-[#F3F4F6] rounded-lg resize-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent placeholder-[#F3F4F6]/50"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim() || isSubmitting}
                            className="bg-[#FACC15] hover:bg-[#FACC15]/90 disabled:bg-[#F3F4F6]/20 disabled:cursor-not-allowed text-[#0F0F0F] px-4 py-1 rounded text-sm font-medium transition-colors"
                          >
                            {isSubmitting ? "Replying..." : "Reply"}
                          </button>
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent("");
                            }}
                            className="text-[#F3F4F6]/50 hover:text-[#F3F4F6] px-4 py-1 rounded text-sm transition-colors"
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
                  <div className="mt-4 ml-4 border-l-2 border-[#F3F4F6]/20 pl-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          style={{
                            background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23e5e7eb"/><text x="16" y="20" text-anchor="middle" fill="%236b7280" font-size="12" font-family="Arial">${reply.author[0]}</text></svg>') center/cover`,
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-[#F3F4F6] text-sm">
                              {reply.author}
                            </h5>
                            <span className="text-xs text-[#F3F4F6]/50">
                              {reply.timestamp}
                            </span>
                          </div>
                          <p className="text-[#F3F4F6]/80 text-sm mb-2">
                            {reply.content}
                          </p>
                          <button
                            onClick={() =>
                              handleLike(reply.id, true, comment.id)
                            }
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              reply.isLiked
                                ? "text-[#FACC15] hover:text-[#FACC15]/80"
                                : "text-[#F3F4F6]/50 hover:text-[#FACC15]"
                            }`}
                          >
                            <svg
                              className="w-3 h-3"
                              fill={reply.isLiked ? "currentColor" : "none"}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
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
          <button className="text-[#FACC15] hover:text-[#FACC15]/80 font-medium transition-colors">
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
}
