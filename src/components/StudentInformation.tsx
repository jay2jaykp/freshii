import React, { useState } from "react";
import { z } from "zod";
import { useMyDisableStore, useStudentStore } from "../state/index";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  number: z.string(),
});

export const StudentInformation: React.FC = () => {
  const toggleState = useMyDisableStore((state) => state.toggleState);
  const { email, name, number, updateInformation } = useStudentStore();

  useEffect(() => {
    const isFormValid = (): boolean => {
      return !formSchema.safeParse({ email, name, number }).success;
    };
    toggleState(isFormValid());
  }, [email, name, number, toggleState]);
  return (
    <div className="flex justify-center gap-4">
      <div>
        <label className="label">
          <span className="label-text">Student Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => updateInformation("name", e.target.value)}
          className="input-bordered input w-full max-w-xs "
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Student Number</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          value={number}
          onChange={(e) => updateInformation("number", e.target.value)}
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Type here"
          value={email}
          onChange={(e) => updateInformation("email", e.target.value)}
          className="input-bordered input w-full max-w-xs"
        />
      </div>
    </div>
  );
};
