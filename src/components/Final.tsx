import React from "react";
import { useStudentStore, useNextButtonDisableStore } from "../state/index";
import { useEffect } from "react";

export const Final: React.FC = () => {
  const { email } = useStudentStore();
  const { toggleState } = useNextButtonDisableStore();
  useEffect(() => {
    toggleState(true);
  }, [toggleState]);
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Thank you!</h2>
        <p>You should receive an Email confirmation of your order at {email}</p>
        <p>Thank you for choosing Freshii.</p>
      </div>
    </div>
  );
};
