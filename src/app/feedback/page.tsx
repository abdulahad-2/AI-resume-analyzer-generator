import { Suspense } from "react";
import FeedbackPage from "./FeedbackPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading feedback...</p>
          </div>
        </div>
      }
    >
      <FeedbackPage />
    </Suspense>
  );
}
