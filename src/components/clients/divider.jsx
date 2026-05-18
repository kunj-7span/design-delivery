import { useState, version } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TopNav = () => (
  <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-2 border-b border-gray-200 bg-white">
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-green-600 text-white rounded font-bold text-xs sm:text-sm">
        DD
      </div>
      <div className="text-xs sm:text-sm font-medium text-gray-900">
        Design Delivery
      </div>
    </div>
  </div>
);

const Version = () => (
  <div className="mb-4 sm:mb-6">
    <div className="text-xs text-gray-600 font-medium mb-2">Version</div>
    <Button className="px-2 sm:px-3 cursor-auto bg-gray-500 hover:bg-gray-500 text-sm rounded-sm">
      v · latest
    </Button>
  </div>
);

const ViewerHeader = ({ title, folder, date }) => (
  <div className="mb-4 sm:mb-6">
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
      {title}
    </h1>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-gray-600">
      <span className="flex items-center gap-1">{folder}</span>
      <span className="flex items-center gap-1">Created {date}</span>
    </div>
  </div>
);

const FileViewer = ({ imageUrl, fileName }) => (
  <div className="flex items-center w-full justify-center h-48 sm:h-64 md:h-80 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mb-4 overflow-hidden">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={fileName}
        className="w-full h-full object-contain"
      />
    ) : (
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <div className="text-xs text-gray-600">{fileName}</div>
      </div>
    )}
  </div>
);

const ViewerControls = ({ imageUrl, fileName }) => {
  const handleOpenNewTab = async () => {
    if (!imageUrl) return;

    const newTab = window.open("", "_blank");

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      if (newTab) {
        newTab.location.href = blobUrl;

        newTab.onload = () => {
          URL.revokeObjectURL(blobUrl);
        };
      }
    } catch (error) {
      console.error("Failed to open image:", error);

      if (newTab) {
        newTab.close();
      }
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "downloaded-image";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex gap-2 justify-center pt-3 sm:pt-4 flex-col sm:flex-row">
      <button
        onClick={handleOpenNewTab}
        className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 bg-gray-50 rounded hover:bg-gray-300 text-xs transition-all"
      >
        Open in new tab
      </button>
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 bg-gray-50 rounded hover:bg-gray-300 text-xs transition-all"
      >
        Download
      </button>
    </div>
  );
};

const ViewerSection = ({ imageUrl, fileName }) => (
  <>
    <div className="flex-1 p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-200 overflow-y-auto">
      <div className="sm:flex items-start sm:items-start justify-between ">
        <div className="flex-1">
          <ViewerHeader
            title="Social media kit"
            folder="TechCorp Rebrand"
            date="May 14, 2025"
          />
        </div>
        <div className="w-full sm:w-auto">
          <Version />
        </div>
      </div>
      <FileViewer imageUrl={imageUrl} fileName={fileName} />
      <ViewerControls imageUrl={imageUrl} fileName={fileName} />
    </div>
  </>
);

const DecisionSection = ({
  onApprove,
  onRequestRevision,
  isApproved,
  isRequested,
}) => (
  <div>
    <div className="text-sm font-semibold text-gray-900 mb-3">
      Your decision
    </div>
    <div className="text-xs text-gray-600 mb-3">
      Review the design and let the agency know.
    </div>
    <Button
      onClick={onApprove}
      disabled={isRequested}
      className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-all mb-2 ${
        isApproved
          ? "bg-green-500 text-white hover:bg-green-700"
          : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
      }`}
    >
      {isApproved ? "Approved" : "Approve design"}
    </Button>
    <div className="text-center text-xs text-gray-600 my-2">or</div>
    <Button
      variant="destructive"
      onClick={onRequestRevision}
      disabled={isApproved}
      className={`w-full  ${
        isRequested
          ? "bg-red-500 text-white hover:bg-red-700"
          : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
      }`}
    >
      {isRequested ? "Revision requested" : "Request revision"}
    </Button>
  </div>
);

const CommentSection = ({
  onAddComment,
  showCommentBox,
  onCommentSubmitted,
}) => {
  const [comment, setComment] = useState("");

  const handleSendComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
      onCommentSubmitted();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  if (!showCommentBox) {
    return null;
  }

  return (
    <div>
      <div className="text-sm font-semibold text-gray-900 mb-2">Comments</div>
      <div className="flex flex-col gap-2 p-2 sm:p-3 border border-gray-300 rounded-lg bg-gray-50">
        <Textarea
          placeholder="Leave feedback or comment for the designer…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyPress}
          className="p-2 border border-gray-300 rounded bg-white text-xs font-sans resize-vertical min-h-20 focus:outline-none focus:ring-2 focus:ring-purple-300"
        ></Textarea>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSendComment}
            disabled={!comment.trim()}
            className="px-2 sm:px-3 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Send comment
          </Button>
        </div>
      </div>
    </div>
  );
};

const InfoBox = () => (
  <>
    <div className="flex items-start gap-2 p-2 sm:p-3 bg-green-50 border-l-4 border-green-600 rounded text-xs text-green-700 mt-4">
      <span>
        Your feedback is sent directly to the design team. No account needed.
      </span>
    </div>
  </>
);

const ApprovCard = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white p-4">
    <div className="flex flex-col items-center gap-8 max-w-md">
      <Card className="w-full hover:shadow-xl bg-gray-50 border-gray-300">
        <CardHeader>
          <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center">
            <svg
              className="w-20 h-20 sm:w-20 sm:h-20 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Design approved !
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Thank you for your feedback. The agency has been notified of your
              approval.
            </p>
          </div>
          <CardTitle className="text-gray-900 text-lg">
            Social media kit
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 text-xs space-y-2">
          <div className="flex justify-between">
            <span>Version</span>
            <span className="font-semibold">v2</span>
          </div>
          <div className="flex justify-between">
            <span>Decision</span>
            <Badge variant="default" className="bg-green-600">
              Approved
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-semibold">May 14, 2025</span>
          </div>
        </CardContent>
      </Card>

      <p className="text-gray-500 text-xs text-center">
        This decision has been recorded. You can close this page safely.
      </p>
    </div>
  </div>
);

const RevisionCard = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white p-4">
    <div className="flex flex-col items-center gap-8 max-w-md">
      <Card className="w-full hover:shadow-xl bg-gray-50 border-gray-300">
        <CardHeader>
          <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-red-100 to-red-50 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                // r="9"
                strokeWidth="2"
                strokeDasharray="3 2"
              />

              <path strokeLinecap="round" strokeWidth="2.5" d="M12 7v6" />

              <circle cx="12" cy="17" r="1" fill="currentColor" />
            </svg>
            {/* <svg
                className="w-20 h-20 sm:w-20 sm:h-20 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> */}
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Revision requested
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Your feedback has been sent to the designer. They'll upload a
              revised version shortly.
            </p>
          </div>
          <CardTitle className="text-gray-900 text-lg">
            Social media kit
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 text-xs space-y-2">
          <div className="flex justify-between">
            <span>Version</span>
            <span className="font-semibold">v2</span>
          </div>
          <div className="flex justify-between">
            <span>Decision</span>
            <Badge variant="default" className="bg-red-600">
              Revision
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-semibold">May 14, 2025</span>
          </div>
        </CardContent>
      </Card>

      <p className="text-gray-500 text-xs text-center">
        You'll receive a new link via WhatsApp or email once the revision <br />
        is ready.
      </p>
    </div>
  </div>
);

const ActionSection = ({
  onApprove,
  onRequestRevision,
  isApproved,
  isRequested,
  comments,
  onAddComment,
  onCommentSubmitted,
}) => (
  <div className="w-full sm:w-80 md:w-96 p-4 sm:p-6 h-auto sm:h-full overflow-y-auto bg-white">
    <hr className="my-1.5 border-white" />
    <DecisionSection
      onApprove={onApprove}
      onRequestRevision={onRequestRevision}
      isApproved={isApproved}
      isRequested={isRequested}
    />
    <hr className="my-1.5 border-white" />
    <CommentSection
      comments={comments}
      onAddComment={onAddComment}
      showCommentBox={isApproved || isRequested}
      onCommentSubmitted={onCommentSubmitted}
    />
    <hr className="my-1.5 border-white" />
    <InfoBox />
  </div>
);

export default function Divider() {
  const [activeVersion, setActiveVersion] = useState("v2");
  const [isApproved, setIsApproved] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);

  const images = {
    v2: "data:image/jpeg;base64,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",
  };

  const fileNames = {
    [activeVersion]: "",
  };

  const handleApprove = () => {
    setIsApproved(true);
    setIsRequested(false);
  };

  const handleRequestRevision = () => {
    setIsRequested(true);
    setIsApproved(false);
  };

  const handleAddComment = (commentText) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newComment = {
      author: "You",
      text: commentText,
      time: timeString,
    };

    setComments([newComment]);
  };

  const handleCommentSubmitted = () => {
    setIsCommentSubmitted(true);
  };

  if (isCommentSubmitted) {
    return (
      <div className="flex flex-col bg-white">
        <TopNav />
        <div className="flex">
          {isApproved ? <ApprovCard /> : <RevisionCard />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNav />
      <div className="flex flex-col sm:flex-row flex-1">
        <ViewerSection
          // activeVersion={activeVersion}
          // onVersionChange={setActiveVersion}
          imageUrl={images[activeVersion]}
          fileName={fileNames[activeVersion]}
        />
        <ActionSection
          onApprove={handleApprove}
          onRequestRevision={handleRequestRevision}
          isApproved={isApproved}
          isRequested={isRequested}
          comments={comments}
          onAddComment={handleAddComment}
          onCommentSubmitted={handleCommentSubmitted}
        />
      </div>
    </div>
  );
}
