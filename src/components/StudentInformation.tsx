import React from "react";
import { z } from "zod";
import { useNextButtonDisableStore, useStudentStore } from "../state/index";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  number: z.string(),
});

export const StudentInformation: React.FC = () => {
  const toggleState = useNextButtonDisableStore((state) => state.toggleState);
  const { email, name, number, updateInformation } = useStudentStore();

  useEffect(() => {
    const isFormValid = (): boolean => {
      return !formSchema.safeParse({ email, name, number }).success;
    };
    toggleState(isFormValid());
  }, [email, name, number, toggleState]);

  useEffect(() => {
    toggleState(true);
  }, [toggleState]);
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
