import React from "react";

function Loading() {
  return (
    <div className="w-[400px] h-[400px] bg-neutral grid place-items-center rounded-lg">
      <progress className="progress progress-primary w-56"></progress>
    </div>
  );
}

export default Loading;
