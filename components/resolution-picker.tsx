import React from "react";

function ResolutionPicker({
  setState,
  value,
}: {
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="absolute bottom-12 py-4 w-full flex flex-row justify-center gap-2 bg-neutral bg-opacity-70 backdrop-blur-md">
      <button
        className={`badge badge-accent ${
          value === "1080" ? "" : "badge-outline"
        } py-3`}
        onClick={() => {
          setState("1080");
        }}
      >
        1080px
      </button>
      <button
        className={`badge badge-accent ${
          value === "2000" ? "" : "badge-outline"
        } py-3`}
        onClick={() => {
          setState("2000");
        }}
      >
        2000px
      </button>
      <button
        className={`badge badge-accent ${
          value === "4000" ? "" : "badge-outline"
        } py-3`}
        onClick={() => {
          setState("4000");
        }}
      >
        4000px
      </button>
    </div>
  );
}

export default ResolutionPicker;
