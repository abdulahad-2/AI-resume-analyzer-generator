import { Suspense } from "react";
import GeneratedResumePage from "./GeneratedResumePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading resume...</div>}>
      <GeneratedResumePage />
    </Suspense>
  );
}
